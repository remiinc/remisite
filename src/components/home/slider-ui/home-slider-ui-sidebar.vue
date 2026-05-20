<script setup>
import SiteLogo from '../../global/site-logo.vue'
import { PhPlus, PhListChecks, PhPlusCircle, PhLightning, PhFolderSimple } from '@phosphor-icons/vue'
</script>

<template>
    <div class="p-[0.5em] rounded-[1em] bg-foreground/3 flex flex-col justify-between">
        <div class="flex flex-col gap-[0.5em]">
            <div class="flex items-center justify-center self-start p-[0.25em]">
                <SiteLogo class="size-[1.5em]" />
            </div>
            <ul
                class="flex flex-col list-none [&>li]:text-[0.75em] [&>li]:leading-normal [&>li]:tracking-tight [&>li]:font-normal [&>li]:text-foreground/50 [&>li]:py-[0.35em] [&>li]:px-[0.8em] [&>li]:rounded-full [&>li]:hover:bg-foreground/5 [&>li]:cursor-pointer [&>li]:flex [&>li]:items-center [&>li]:gap-[0.5em] [&>li>svg]:size-[1em] [&>li>svg]:text-foreground [&>li>svg]:opacity-30 min-w-[10em] gap-[0.125em]">
                <li class="bg-foreground/5 text-foreground! [&>svg]:opacity-100!">
                    <PhPlus /> New Task
                </li>
                <li>
                    <PhListChecks /> Tasks
                </li>
                <li>
                    <PhPlusCircle weight="fill" />Integrations
                </li>
                <li>
                    <PhLightning weight="fill" /> Automations
                </li>
                <li>
                    <PhFolderSimple weight="fill" /> Files
                </li>
                <li><svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
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
