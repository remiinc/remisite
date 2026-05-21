<script setup>
import P5 from 'p5'
import { onBeforeUnmount, onMounted, ref } from 'vue'

const hostRef = ref(null)

let sketch = null
let resizeObserver = null

const groupColors = [
  { r: 45, g: 212, b: 191 },
  { r: 129, g: 140, b: 248 },
  { r: 244, g: 114, b: 182 },
  { r: 251, g: 146, b: 60 },
  { r: 52, g: 211, b: 153 },
  { r: 56, g: 189, b: 248 },
  { r: 250, g: 204, b: 21 },
  { r: 192, g: 132, b: 252 },
  { r: 248, g: 113, b: 113 },
]

const clusterSeeds = [
  { label: 'Today', center: { x: -0.48, y: -0.31, z: 0.04 }, count: 13, radius: 0.19 },
  { label: 'Topics', center: { x: -0.06, y: -0.37, z: -0.05 }, count: 15, radius: 0.2 },
  { label: 'Projects', center: { x: 0.39, y: -0.29, z: 0.08 }, count: 13, radius: 0.18 },
  { label: 'People', center: { x: -0.43, y: 0.02, z: -0.12 }, count: 16, radius: 0.21 },
  { label: 'Org', center: { x: 0.06, y: -0.02, z: 0.14 }, count: 18, radius: 0.22 },
  { label: 'Files', center: { x: 0.49, y: 0.05, z: -0.08 }, count: 15, radius: 0.19 },
  { label: 'Tasks', center: { x: -0.34, y: 0.36, z: 0.1 }, count: 14, radius: 0.19 },
  { label: 'Decisions', center: { x: 0.12, y: 0.39, z: -0.04 }, count: 16, radius: 0.2 },
  { label: 'Risks', center: { x: 0.5, y: 0.34, z: 0.12 }, count: 13, radius: 0.18 },
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

  links.push({ from: 0, to: 1 + clusterSeeds[0].count, groupIndex: 1, order: links.length, strength: 0.26 })
  links.push({ from: 1 + clusterSeeds[0].count, to: 2 + clusterSeeds[0].count + clusterSeeds[1].count, groupIndex: 2, order: links.length, strength: 0.22 })
  links.push({ from: 0, to: 3 + clusterSeeds[0].count + clusterSeeds[1].count + clusterSeeds[2].count, groupIndex: 3, order: links.length, strength: 0.22 })

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
        color: groupColors[point.groupIndex % groupColors.length],
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
      p.fill(point.color.r, point.color.g, point.color.b, 255)
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
        const color = groupColors[link.groupIndex % groupColors.length]
        const depth = p.map((from.z + to.z) * 0.5, -0.7, 0.7, 0.35, 1)
        const alpha = Math.max(18, 86 * link.strength * depth)

        p.stroke(color.r, color.g, color.b, alpha)
        p.strokeWeight(link.strength > 0.8 ? 0.85 : 0.55)
        p.line(from.x, from.y, to.x, to.y)
      })

      projectedPoints.forEach((point) => {
        const depth = p.map(point.z, -0.7, 0.7, 0.55, 1)
        const dotSize = point.isHub ? 5.2 : 3.2

        p.noStroke()
        p.fill(point.color.r, point.color.g, point.color.b, 190 * depth)
        p.circle(point.x, point.y, dotSize)
      })

      projectedPoints
        .filter((point) => point.isHub)
        .sort((a, b) => a.z - b.z)
        .forEach((point) => drawGroupLabel(point, size))
    }

    p.setup = () => {
      const size = hostRef.value?.clientWidth || 320
      const canvas = p.createCanvas(size, size)

      canvas.parent(hostRef.value)
      canvas.elt.style.background = 'transparent'
      p.pixelDensity(Math.min(window.devicePixelRatio || 1, 3))
      p.smooth()
      p.noLoop()
    }

    p.draw = drawMemoryGraph
  })

  resizeObserver = new ResizeObserver(([entry]) => {
    if (!entry || !sketch) return

    const size = Math.round(entry.contentRect.width)

    sketch.resizeCanvas(size, size)
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
    ref="hostRef"
    class="aspect-square w-full overflow-hidden [&_canvas]:block [&_canvas]:size-full"
    aria-label="Shared memory cluster visualization"
    role="img"
  />
</template>
