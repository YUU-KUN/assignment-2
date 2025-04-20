<template>
    <div class="sticky top-0 flex items-center justify-between py-3 px-5 w-full bg-secondary text-white">

        <!-- Left Section -->
        <div class="flex items-center gap-7">
            <RouterLink to="/" activeClass="text-tertiary" class="flex items-center justify-center gap-1">
                <PhSquaresFour :size="24" />
                <p class="text-14 font-semibold">Dashboard</p>
            </RouterLink>
            <RouterLink to="/collections" activeClass="text-tertiary" class="flex items-center justify-center gap-1">
                <PhFolderOpen :size="24" />
                <p class="text-14 font-semibold">Collections</p>
            </RouterLink>
        </div>
    </div>
</template>

<script setup lang="ts">
</script>

<style scoped></style>