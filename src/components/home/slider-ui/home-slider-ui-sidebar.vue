<script setup>
import { ref } from 'vue'
import SiteLogo from '../../global/site-logo.vue'
import { PhPlus, PhListChecks, PhPlusCircle, PhLightning, PhFolderSimple } from '@phosphor-icons/vue'

const activeSidebarItem = ref('new-task')
</script>

<template>
    <div class="p-[0.5em] rounded-[1em] bg-foreground/3 flex flex-col justify-between gap-[2em] h-full">
        <div class="flex flex-col gap-[0.5em]">
            <div class="flex items-center justify-center self-start p-[0.25em]">
                <SiteLogo class="size-[1.5em]" />
            </div>
            <ul
                class="flex flex-col list-none [&>li]:relative [&>li]:isolate [&>li]:text-[0.75em] [&>li]:leading-normal [&>li]:tracking-tight [&>li]:font-normal [&>li]:text-foreground/50 [&>li]:py-[0.35em] [&>li]:px-[0.8em] [&>li]:rounded-full [&>li]:cursor-pointer [&>li]:flex [&>li]:items-center [&>li]:gap-[0.5em] [&>li]:transition-colors [&>li]:duration-200 [&>li]:before:absolute [&>li]:before:inset-[-0.25em] [&>li]:before:z-[-1] [&>li]:before:rounded-full [&>li]:before:bg-foreground/5 [&>li]:before:opacity-0 [&>li]:before:transition-[inset,opacity] [&>li]:before:duration-200 [&>li]:before:ease-out [&>li]:before:content-[''] [&>li[data-active=true]]:text-foreground! [&>li[data-active=true]]:before:inset-0 [&>li[data-active=true]]:before:opacity-100 [&>li>svg]:size-[1em] [&>li>svg]:text-foreground [&>li>svg]:opacity-30 [&>li[data-active=true]>svg]:opacity-100! min-w-[10em] gap-[0.125em]">
                <li
                    class="relative"
                    :data-active="activeSidebarItem === 'new-task'"
                    role="button"
                    tabindex="0"
                    @click="activeSidebarItem = 'new-task'"
                    @keydown.enter="activeSidebarItem = 'new-task'"
                    @keydown.space.prevent="activeSidebarItem = 'new-task'"
                >
                    <PhPlus /> New Task
                </li>
                <li
                    class="relative"
                    :data-active="activeSidebarItem === 'tasks'"
                    role="button"
                    tabindex="0"
                    @click="activeSidebarItem = 'tasks'"
                    @keydown.enter="activeSidebarItem = 'tasks'"
                    @keydown.space.prevent="activeSidebarItem = 'tasks'"
                >
                    <PhListChecks /> Tasks
                </li>
                <li
                    class="relative"
                    :data-active="activeSidebarItem === 'integrations'"
                    role="button"
                    tabindex="0"
                    @click="activeSidebarItem = 'integrations'"
                    @keydown.enter="activeSidebarItem = 'integrations'"
                    @keydown.space.prevent="activeSidebarItem = 'integrations'"
                >
                    <PhPlusCircle weight="fill" />Integrations
                </li>
                <li
                    class="relative"
                    :data-active="activeSidebarItem === 'automations'"
                    role="button"
                    tabindex="0"
                    @click="activeSidebarItem = 'automations'"
                    @keydown.enter="activeSidebarItem = 'automations'"
                    @keydown.space.prevent="activeSidebarItem = 'automations'"
                >
                    <PhLightning weight="fill" /> Automations
                </li>
                <li
                    class="relative"
                    :data-active="activeSidebarItem === 'files'"
                    role="button"
                    tabindex="0"
                    @click="activeSidebarItem = 'files'"
                    @keydown.enter="activeSidebarItem = 'files'"
                    @keydown.space.prevent="activeSidebarItem = 'files'"
                >
                    <PhFolderSimple weight="fill" /> Files
                </li>
                <li
                    class="relative"
                    :data-active="activeSidebarItem === 'intelligence'"
                    role="button"
                    tabindex="0"
                    @click="activeSidebarItem = 'intelligence'"
                    @keydown.enter="activeSidebarItem = 'intelligence'"
                    @keydown.space.prevent="activeSidebarItem = 'intelligence'"
                ><svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <circle cx="8.00016" cy="4.41593" r="3.08414" stroke="currentColor"></circle>
                        <circle cx="11.1042" cy="6.20792" r="3.08414" stroke="currentColor"></circle>
                        <circle cx="11.1042" cy="9.79239" r="3.08414" stroke="currentColor"></circle>
                        <circle cx="7.99967" cy="11.5844" r="3.08414" stroke="currentColor"></circle>
                        <circle cx="4.89566" cy="9.79215" r="3.08414" stroke="currentColor"></circle>
                        <circle cx="4.89615" cy="6.20816" r="3.08414" stroke="currentColor"></circle>
                    </svg>Intelligence</li>
            </ul>
        </div>
        <div class="flex flex-col gap-[0.5em]">
            <button
                class="flex items-center gap-[0.5em] text-[0.75em] font-medium leading-normal tracking-tight p-[0.5em] rounded-[0.8em] bg-foreground/5">
                <div class="flex items-center justify-center aspect-square size-4 rounded-full bg-cyan-400" />
                <span>Hunter</span>
            </button>
        </div>
    </div>
</template>
