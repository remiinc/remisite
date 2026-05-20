<script setup>
import P5 from 'p5'
import { onBeforeUnmount, onMounted, ref } from 'vue'

const hostRef = ref(null)

let sketch = null
let resizeObserver = null

const logoUrls = [
  'https://logos.composio.dev/api/slack',
  'https://logos.composio.dev/api/linear',
  'https://logos.composio.dev/api/notion',
  'https://logos.composio.dev/api/gmail',
  'https://logos.composio.dev/api/googlecalendar',
  'https://logos.composio.dev/api/googledocs',
  'https://logos.composio.dev/api/hubspot',
  'https://logos.composio.dev/api/salesforce',
]

const pointColors = [
  { r: 244, g: 114, b: 182 },
  { r: 251, g: 146, b: 60 },
  { r: 250, g: 204, b: 21 },
  { r: 52, g: 211, b: 153 },
  { r: 45, g: 212, b: 191 },
  { r: 56, g: 189, b: 248 },
  { r: 129, g: 140, b: 248 },
  { r: 192, g: 132, b: 252 },
  { r: 248, g: 113, b: 113 },
]

const createSpherePoints = (count) => {
  const goldenAngle = Math.PI * (3 - Math.sqrt(5))

  return Array.from({ length: count }, (_, index) => {
    const y = 1 - (index / (count - 1)) * 2
    const radius = Math.sqrt(1 - y * y)
    const theta = goldenAngle * index
    const pulse = 0.88 + ((index * 37) % 19) / 120

    return {
      color: pointColors[(index * 7) % pointColors.length],
      x: Math.cos(theta) * radius * pulse,
      y: y * pulse,
      z: Math.sin(theta) * radius * pulse,
    }
  })
}

onMounted(() => {
  const points = createSpherePoints(220)
  const logoImages = logoUrls.map((url) => {
    const image = new Image()

    image.src = url

    return image
  })

  sketch = new P5((p) => {
    let activeMarkers = []
    let lastActiveMarkerStartedAt = -Infinity
    let logoCursor = 0

    const activePointGrowDuration = 320
    const activePointHoldDuration = 1150
    const activePointShrinkDuration = 380
    const activePointDuration =
      activePointGrowDuration + activePointHoldDuration + activePointShrinkDuration
    const activePointStagger = 520

    const easeInOutSine = (value) => -(Math.cos(Math.PI * value) - 1) / 2
    const easeOutCubic = (value) => 1 - Math.pow(1 - value, 3)
    const easeInCubic = (value) => value * value * value

    const getMarkerPulse = (marker) => {
      const elapsed = p.millis() - marker.startedAt
      const growProgress = Math.min(elapsed / activePointGrowDuration, 1)
      const shrinkProgress = Math.min(
        Math.max(elapsed - activePointGrowDuration - activePointHoldDuration, 0) /
          activePointShrinkDuration,
        1
      )

      return easeOutCubic(growProgress) * (1 - easeInCubic(shrinkProgress))
    }

    const getNextLogoIndex = () => {
      const activeLogoIndexes = new Set(activeMarkers.map((marker) => marker.logoIndex))

      for (let offset = 0; offset < logoImages.length; offset += 1) {
        const logoIndex = (logoCursor + offset) % logoImages.length

        if (!activeLogoIndexes.has(logoIndex)) {
          logoCursor = (logoIndex + 1) % logoImages.length

          return logoIndex
        }
      }

      logoCursor = (logoCursor + 1) % logoImages.length

      return logoCursor
    }

    const drawLogo = (image, x, y, size, alpha) => {
      if (!image?.complete || !image.naturalWidth) return

      const iconSize = size * 0.52

      p.drawingContext.save()
      p.drawingContext.globalAlpha = alpha
      p.drawingContext.drawImage(
        image,
        x - iconSize * 0.5,
        y - iconSize * 0.5,
        iconSize,
        iconSize
      )
      p.drawingContext.restore()
    }

    const getVisibleBounds = (size) => {
      const canvasRect = hostRef.value?.getBoundingClientRect()
      const clipRect = hostRef.value
        ?.closest('[data-radial-network-clip]')
        ?.getBoundingClientRect()

      if (!canvasRect || !clipRect) {
        return {
          bottom: size,
          left: 0,
          right: size,
          top: 0,
        }
      }

      return {
        bottom: Math.min(((clipRect.bottom - canvasRect.top) / canvasRect.height) * size, size),
        left: Math.max(((clipRect.left - canvasRect.left) / canvasRect.width) * size, 0),
        right: Math.min(((clipRect.right - canvasRect.left) / canvasRect.width) * size, size),
        top: Math.max(((clipRect.top - canvasRect.top) / canvasRect.height) * size, 0),
      }
    }

    const rotatePoint = (point, time) => {
      const tilt = -0.34
      const roll = time * 0.5
      const cosY = Math.cos(time)
      const sinY = Math.sin(time)
      const cosX = Math.cos(tilt)
      const sinX = Math.sin(tilt)
      const cosZ = Math.cos(roll)
      const sinZ = Math.sin(roll)
      const x1 = point.x * cosY + point.z * sinY
      const z1 = -point.x * sinY + point.z * cosY
      const y2 = point.y * cosX - z1 * sinX
      const z2 = point.y * sinX + z1 * cosX

      return {
        x: x1 * cosZ - y2 * sinZ,
        y: x1 * sinZ + y2 * cosZ,
        z: z2,
      }
    }

    const drawTaperedLine = (from, to, alpha, color) => {
      const dx = to.x - from.x
      const dy = to.y - from.y
      const length = Math.hypot(dx, dy)

      if (length < 1) return

      const normalX = -dy / length
      const normalY = dx / length
      const innerWidth = 0.03
      const outerWidth = 0.42
      const fadeOffset = Math.min(length * 0.12, 22)
      const start = {
        x: from.x + (dx / length) * fadeOffset,
        y: from.y + (dy / length) * fadeOffset,
      }
      const gradient = p.drawingContext.createLinearGradient(start.x, start.y, to.x, to.y)

      gradient.addColorStop(0, `rgba(${color.r}, ${color.g}, ${color.b}, 0)`)
      gradient.addColorStop(0.34, `rgba(${color.r}, ${color.g}, ${color.b}, ${alpha * 0.003})`)
      gradient.addColorStop(1, `rgba(${color.r}, ${color.g}, ${color.b}, ${alpha / 255})`)

      p.drawingContext.fillStyle = gradient
      p.drawingContext.beginPath()
      p.drawingContext.moveTo(start.x + normalX * innerWidth, start.y + normalY * innerWidth)
      p.drawingContext.lineTo(to.x + normalX * outerWidth, to.y + normalY * outerWidth)
      p.drawingContext.lineTo(to.x - normalX * outerWidth, to.y - normalY * outerWidth)
      p.drawingContext.lineTo(start.x - normalX * innerWidth, start.y - normalY * innerWidth)
      p.drawingContext.closePath()
      p.drawingContext.fill()
    }

    const drawNetwork = () => {
      const size = Math.min(p.width, p.height)
      const center = size * 0.5
      const sphereRadius = size * 0.35
      const cameraDistance = sphereRadius * 3.2
      const hub = {
        x: center + size * 0.035,
        y: center - size * 0.025,
      }
      const visibleBounds = getVisibleBounds(size)
      const activeIconPadding = 34
      const time = p.frameCount * 0.0026
      const projectedPoints = points.map((point, index) => {
        const rotated = rotatePoint(point, time)
        const x = rotated.x * sphereRadius
        const y = rotated.y * sphereRadius
        const z = rotated.z * sphereRadius
        const perspective = cameraDistance / (cameraDistance - z)

        return {
          color: point.color,
          index,
          x: center + x * perspective,
          y: center + y * perspective,
          z: rotated.z,
        }
      })
      const activeCandidates = projectedPoints.filter(
        (point) =>
          point.z > 0.45 &&
          point.x > visibleBounds.left + activeIconPadding &&
          point.x < visibleBounds.right - activeIconPadding &&
          point.y > visibleBounds.top + activeIconPadding &&
          point.y < visibleBounds.bottom - activeIconPadding
      )
      const pulseSmoothing = 1 - Math.pow(0.001, p.deltaTime / 150)

      activeMarkers = activeMarkers
        .map((marker) => ({
          ...marker,
          pulse: marker.pulse + (getMarkerPulse(marker) - marker.pulse) * pulseSmoothing,
        }))
        .filter(
          (marker) =>
            p.millis() - marker.startedAt < activePointDuration || marker.pulse > 0.02
        )

      while (
        activeMarkers.length < 2 &&
        activeCandidates.length &&
        p.millis() - lastActiveMarkerStartedAt > activePointStagger
      ) {
        const availableCandidates = activeCandidates.filter(
          (point) => !activeMarkers.some((marker) => marker.index === point.index)
        )

        if (!availableCandidates.length) break

        const point =
          availableCandidates[Math.floor(Math.random() * availableCandidates.length)]

        activeMarkers.push({
          index: point.index,
          logoIndex: getNextLogoIndex(),
          startedAt: p.millis(),
          pulse: 0,
        })
        lastActiveMarkerStartedAt = p.millis()
      }

      p.clear()
      p.noStroke()

      projectedPoints.forEach((point) => {
        drawTaperedLine(hub, point, p.map(point.z, -1, 1, 38, 120), point.color)
      })

      projectedPoints.forEach((point) => {
        if (activeMarkers.some((marker) => marker.index === point.index && marker.pulse > 0.01)) return

        p.fill(point.color.r, point.color.g, point.color.b, p.map(point.z, -1, 1, 185, 255))
        p.circle(point.x, point.y, 3.2)
      })

      activeMarkers.forEach((marker) => {
        const activePoint = projectedPoints.find((point) => point.index === marker.index)

        if (!activePoint || marker.pulse <= 0.01) return

        const activeSize = 3.2 + marker.pulse * 46.5

        p.push()
        p.drawingContext.shadowBlur = 10 * marker.pulse
        p.drawingContext.shadowColor = `rgba(0, 0, 0, ${0.06 * marker.pulse})`
        p.drawingContext.shadowOffsetY = 4 * marker.pulse
        p.fill(255, 245 + marker.pulse * 10)
        p.stroke(activePoint.color.r, activePoint.color.g, activePoint.color.b, 28 * marker.pulse)
        p.strokeWeight(0.55)
        p.circle(activePoint.x, activePoint.y, activeSize)
        p.pop()
        p.noStroke()
        drawLogo(
          logoImages[marker.logoIndex],
          activePoint.x,
          activePoint.y,
          activeSize,
          Math.min(marker.pulse * 1.5, 1)
        )
      })
    }

    p.setup = () => {
      const size = hostRef.value?.clientWidth || 320
      const canvas = p.createCanvas(size, size)

      canvas.parent(hostRef.value)
      canvas.elt.style.background = 'transparent'
      p.pixelDensity(Math.min(window.devicePixelRatio || 1, 3))
      p.smooth()
      p.noFill()
    }

    p.draw = drawNetwork
  })

  resizeObserver = new ResizeObserver(([entry]) => {
    if (!entry || !sketch) return

    const size = Math.round(entry.contentRect.width)

    sketch.resizeCanvas(size, size)
  })

  if (hostRef.value) {
    resizeObserver.observe(hostRef.value)
  }
})

onBeforeUnmount(() => {
  resizeObserver?.disconnect()
  sketch?.remove()
})
</script>

<template>
  <div
    ref="hostRef"
    class="aspect-square w-full overflow-hidden [&_canvas]:block [&_canvas]:size-full"
    aria-label="Radial network visualization"
    role="img"
  />
</template>
