# Remi Guidelines

## Purpose

Use this document as the source of truth when describing what Remi is, what it does, who it is for, and how its product behavior should be framed.

This document focuses on Remi's product capabilities and feature descriptions. Tone, voice, and writing style belong in `docs/copy-guidelines.md`.

## Canonical Positioning

Remi is an AI operations agent/assistant for small businesses: agencies, consultancies, service businesses, implementation shops, and other client-facing teams.

Frame Remi as an operating teammate, not a generic chatbot. Remi watches the places work happens, understands client and project context, turns messy coordination into owners and next steps, drafts useful artifacts, and executes approved work through governed tools with receipts.

## What Remi Does

### Slack-Native Coordination

Remi works in DMs, channels, Slack threads, shared/client channels, Portal chat, and Linq/mobile-style surfaces.

Each Slack surface keeps its own context, so a DM, root channel, and thread do not leak meaning into each other.

### Client Operations

Remi tracks client asks, feedback, blockers, timing, missing assets, access needs, defects, scope hints, and escalation signals.

It can triage urgency, identify likely owners, prepare response drafts, and assemble escalation packets.

### Project Accountability

Remi connects requests to clients, engagements, deliverables, owners, deadlines, SOW/contracts, tracker references, and source evidence.

The product goal is to keep "who owns what, by when, based on what source" visible.

### Org Intelligence

Remi builds and maintains source-backed knowledge about companies, clients, people, engagements, commitments, processes, preferences, quirks, and open questions.

It distinguishes durable org intelligence from conversational memory.

### Portal Workspace

Remi provides browser surfaces for tasks, collaborative documents, files, knowledge, clients/intelligence, queue review, automations, skills, integrations, usage, billing, and settings.

### Documents And Files

Remi creates and edits briefs, reports, plans, drafts, client documents, meeting notes, and organized file/folder structures in the Portal, with collaboration support and Slack handoffs.

### Inbox And Calendar Work

Remi supports email triage, reply drafting, meeting prep, calendar-aware proposals, morning briefings, reminders, and follow-up workflows.

### Automations

Remi can run recurring reports, monitors, reminders, daily briefings, weekly reviews, stale-follow-up checks, workflow proposals, and scheduled operational routines.

### Integrations

Remi is designed around roles like chat, inbox, calendar, tracker, CRM, document store, accounting/PSA, development tools, and browser sessions.

Current docs mention Slack, Gmail, Google Calendar, Google Drive, Linear, GitHub, Notion-style stores, CRM/project/accounting providers, Composio/generic tools, and a "3,000+ integrations" portal claim.

### Business-Function Playbooks

Remi's skill library covers sales, pipeline, client health, renewals, delivery, engagement kickoff, capacity planning, staffing, utilization, finance, billing, collections, legal review, people ops, performance prep, support triage, data analysis, product work, research, and reporting.

## How Remi Helps Customers

Remi's core customer promise is: client work stops falling through the cracks and teams get time back without adding another system to babysit.

In practical terms, Remi can prepare meeting briefs, summarize client threads, draft client-safe replies, flag scope creep, track open asks, prepare weekly ops reviews, identify stale follow-ups, create project/status briefs, propose tracker updates, prepare invoice or collection drafts, and surface risks before they become client-visible problems.

The strongest wedge is client-service operations: Remi notices the quiet operational signals scattered across Slack, email, docs, calendars, and trackers, then turns them into reviewable work.

## Trust Model

A major product theme is governed execution.

Remi is allowed to draft, propose, ask, and explain, but runtime systems own truth for approvals, delivery, receipts, ledgers, retries, identity, auth, and tenant isolation.

Do not claim something was sent, uploaded, delivered, approved, or completed unless the runtime has receipt or ledger evidence.

Client-visible behavior is intentionally conservative. In client/shared channels, Remi is quiet by default and should only speak or act when explicitly authorized or when a governed workflow makes that appropriate.

## Guidance For LLMs

When talking about Remi, emphasize:

- Remi as an operating teammate for client-facing small businesses.
- Client-service operations as the clearest wedge.
- Context from real work surfaces: Slack, email, docs, calendars, trackers, and connected tools.
- Reviewable work: drafts, packets, summaries, proposals, owners, next steps, and evidence.
- Governed execution with receipts, approvals, ledgers, and source-backed claims.

Avoid:

- Framing Remi as a generic chatbot.
- Claiming autonomous completion without evidence.
- Claiming client-visible actions happen by default.
- Blurring durable org intelligence with short-lived conversational memory.
- Treating Slack threads, DMs, root channels, and shared channels as one shared context.
