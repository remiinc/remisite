<script setup>
import P5 from 'p5'
import { onBeforeUnmount, onMounted, ref } from 'vue'

const hostRef = ref(null)

let sketch = null
let resizeObserver = null
let foregroundColor = { r: 25, g: 24, b: 22 }

const updateForegroundColor = () => {
  if (!hostRef.value) return
  const computed = getComputedStyle(hostRef.value).color
  const canvas = document.createElement('canvas')
  canvas.width = 1
  canvas.height = 1
  const ctx = canvas.getContext('2d')
  if (!ctx) return
  ctx.fillStyle = computed
  ctx.fillRect(0, 0, 1, 1)
  const [r, g, b] = ctx.getImageData(0, 0, 1, 1).data
  foregroundColor = { r, g, b }
}

const clusterSeeds = [
  { label: 'Today', center: { x: -0.85, y: -0.6, z: 0.1 }, count: 13, radius: 0.26 },
  { label: 'Topics', center: { x: -0.05, y: -0.7, z: -0.12 }, count: 15, radius: 0.28 },
  { label: 'Projects', center: { x: 0.78, y: -0.55, z: 0.14 }, count: 13, radius: 0.25 },
  { label: 'People', center: { x: -0.82, y: 0.04, z: -0.18 }, count: 16, radius: 0.3 },
  { label: 'Org', center: { x: 0.08, y: -0.02, z: 0.22 }, count: 18, radius: 0.32 },
  { label: 'Files', center: { x: 0.9, y: 0.08, z: -0.12 }, count: 15, radius: 0.27 },
  { label: 'Tasks', center: { x: -0.65, y: 0.7, z: 0.16 }, count: 14, radius: 0.26 },
  { label: 'Decisions', center: { x: 0.18, y: 0.78, z: -0.06 }, count: 16, radius: 0.28 },
  { label: 'Risks', center: { x: 0.92, y: 0.62, z: 0.18 }, count: 13, radius: 0.25 },
]

const createMemoryGraph = () => {
  const points = []
  const links = []

  clusterSeeds.forEach((cluster, groupIndex) => {
    const hubIndex = points.length

    points.push({
      ...cluster.center,
      groupIndex,
      isHub: true,
      label: cluster.label,
      offset: groupIndex * 0.8,
    })

    const groupPointIndexes = []

    for (let index = 0; index < cluster.count; index += 1) {
      const theta = index * 2.399963 + groupIndex * 0.7
      const phi = Math.acos(1 - 2 * (((index * 17 + groupIndex * 11) % 97) / 97))
      const distance = cluster.radius * (0.42 + (((index * 29 + groupIndex * 13) % 61) / 100))
      const pointIndex = points.length

      points.push({
        x: cluster.center.x + Math.cos(theta) * Math.sin(phi) * distance,
        y: cluster.center.y + Math.sin(theta) * Math.sin(phi) * distance,
        z: cluster.center.z + Math.cos(phi) * distance,
        groupIndex,
        isHub: false,
        offset: index * 0.15 + groupIndex,
      })

      groupPointIndexes.push(pointIndex)
      links.push({ from: hubIndex, to: pointIndex, groupIndex, order: links.length, strength: 1 })

      if (index > 0 && index % 2 === 0) {
        links.push({
          from: pointIndex,
          to: groupPointIndexes[index - 1],
          groupIndex,
          order: links.length,
          strength: 0.42,
        })
      }

      if (index > 2 && index % 5 === 0) {
        links.push({
          from: pointIndex,
          to: groupPointIndexes[index - 3],
          groupIndex,
          order: links.length,
          strength: 0.32,
        })
      }
    }
  })

  const hubIndices = []
  const pointsByGroup = []
  points.forEach((point, idx) => {
    if (point.isHub) {
      hubIndices[point.groupIndex] = idx
    }
    if (!pointsByGroup[point.groupIndex]) pointsByGroup[point.groupIndex] = []
    if (!point.isHub) pointsByGroup[point.groupIndex].push(idx)
  })

  clusterSeeds.forEach((_, groupIndex) => {
    const neighborCount = clusterSeeds.length
    const neighbors = [
      (groupIndex + 1) % neighborCount,
      (groupIndex + 2) % neighborCount,
      (groupIndex + 4) % neighborCount,
    ]
    neighbors.forEach((targetGroup, offset) => {
      if (targetGroup === groupIndex) return
      const hubLink = (groupIndex * 13 + offset) % 2 === 0
      const source = hubLink
        ? hubIndices[groupIndex]
        : pointsByGroup[groupIndex][(offset * 5 + groupIndex) % pointsByGroup[groupIndex].length]
      const targetPool = pointsByGroup[targetGroup]
      if (!targetPool || !targetPool.length) return
      const target = targetPool[(offset * 7 + groupIndex * 3) % targetPool.length]
      links.push({
        from: source,
        to: target,
        groupIndex,
        order: links.length,
        strength: 0.18 + (offset % 3) * 0.04,
      })
    })

    const hubLink = hubIndices[(groupIndex + 3) % clusterSeeds.length]
    if (hubLink != null && hubLink !== hubIndices[groupIndex]) {
      links.push({
        from: hubIndices[groupIndex],
        to: hubLink,
        groupIndex,
        order: links.length,
        strength: 0.14,
      })
    }
  })

  return { links, points }
}

const graph = createMemoryGraph()

onMounted(() => {
  sketch = new P5((p) => {
    const rotatePoint = (point) => {
      const tilt = -0.38
      const yaw = 0.28
      const roll = -0.08
      const cosY = Math.cos(yaw)
      const sinY = Math.sin(yaw)
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

    const projectPoint = (point, size) => {
      const center = size * 0.5
      const radius = size * 0.52
      const cameraDistance = radius * 3
      const rotated = rotatePoint(point)
      const z = rotated.z * radius
      const perspective = cameraDistance / (cameraDistance - z)

      return {
        groupIndex: point.groupIndex,
        isHub: point.isHub,
        label: point.label || '',
        x: center + rotated.x * radius * perspective,
        y: center + rotated.y * radius * perspective,
        z: rotated.z,
      }
    }

    const drawGroupLabel = (point, size) => {
      if (!point.label) return

      const fontSize = Math.max(10, Math.min(13, size * 0.026))
      const paddingX = fontSize * 0.7
      const paddingY = fontSize * 0.38

      p.drawingContext.font = `500 ${fontSize}px Inter, ui-sans-serif, system-ui, sans-serif`
      p.textFont('Inter, ui-sans-serif, system-ui, sans-serif')
      p.textSize(fontSize)
      const textWidth = p.drawingContext.measureText(point.label).width
      const labelWidth = paddingX * 2 + textWidth
      const labelHeight = fontSize + paddingY * 2
      const labelX = Math.round(point.x - labelWidth * 0.5)
      const labelY = Math.round(point.y - labelHeight - fontSize * 1.15)

      p.noStroke()
      p.fill(foregroundColor.r, foregroundColor.g, foregroundColor.b, 255)
      p.rect(labelX, labelY, labelWidth, labelHeight, labelHeight * 0.5)

      p.fill(255, 255, 255, 255)
      p.textAlign(p.LEFT, p.CENTER)
      p.textFont('Inter, ui-sans-serif, system-ui, sans-serif')
      p.textSize(fontSize)
      p.text(
        point.label,
        labelX + paddingX,
        labelY + labelHeight * 0.5
      )
    }

    const drawMemoryGraph = () => {
      const size = Math.min(p.width, p.height)
      const projectedPoints = graph.points.map((point) => projectPoint(point, size))

      p.clear()

      graph.links.forEach((link) => {
        const from = projectedPoints[link.from]
        const to = projectedPoints[link.to]
        const depth = p.map((from.z + to.z) * 0.5, -0.7, 0.7, 0.35, 1)
        const alpha = Math.max(18, 86 * link.strength * depth)

        p.stroke(foregroundColor.r, foregroundColor.g, foregroundColor.b, alpha)
        p.strokeWeight(link.strength > 0.8 ? 0.85 : 0.55)
        p.line(from.x, from.y, to.x, to.y)
      })

      projectedPoints.forEach((point) => {
        const depth = p.map(point.z, -0.7, 0.7, 0.55, 1)
        const dotSize = point.isHub ? 5.2 : 3.2

        p.noStroke()
        p.fill(foregroundColor.r, foregroundColor.g, foregroundColor.b, 190 * depth)
        p.circle(point.x, point.y, dotSize)
      })

      projectedPoints
        .filter((point) => point.isHub)
        .sort((a, b) => a.z - b.z)
        .forEach((point) => drawGroupLabel(point, size))
    }

    p.setup = () => {
      const width = hostRef.value?.clientWidth || 320
      const height = hostRef.value?.clientHeight || 320
      const canvas = p.createCanvas(width, height)

      canvas.parent(hostRef.value)
      canvas.elt.style.background = 'transparent'
      p.pixelDensity(Math.min(window.devicePixelRatio || 1, 3))
      p.smooth()
      p.noLoop()
      updateForegroundColor()
    }

    p.draw = drawMemoryGraph
  })

  resizeObserver = new ResizeObserver(([entry]) => {
    if (!entry || !sketch) return

    const width = Math.round(entry.contentRect.width)
    const height = Math.round(entry.contentRect.height)

    sketch.resizeCanvas(width, height)
    sketch.redraw()
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
    class="relative w-full aspect-6/5 rounded-[2em] overflow-hidden bg-muted flex flex-col items-center justify-center text-sm">
    <div ref="hostRef" class="absolute inset-0 text-foreground [&_canvas]:block [&_canvas]:size-full"
      aria-label="Shared memory cluster visualization" role="img" />
  </div>
</template>
