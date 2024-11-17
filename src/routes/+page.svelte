<script lang="ts">
  import { onMount } from "svelte";
  import type { OsState } from "../models/os-state.model";
  import { bytesToGb } from "../helpers/byte.helper";

  let osState: OsState | undefined = $state(undefined);
  onMount(async () => {
    const res = await fetch("/api/os-state");
    const osStateParsed: OsState = await res.json();
    osState = osStateParsed;
  });
</script>

{#if !osState}
  <p>Error while getting OS state</p>
{:else}
  <h1>{osState.hostname}</h1>
  <p>{osState.osVersion}</p>
  <p>{osState.temperature}</p>
  <p>{bytesToGb(osState.totalMemory, 2)} GB</p>
  <p>{bytesToGb(osState.freeMemory, 2)} GB</p>
  <p>{bytesToGb(osState.usedMemory, 2)} GB</p>
  <p>{bytesToGb(osState.freeStorage, 2)} GB</p>
  <p>{bytesToGb(osState.totalStorage, 2)} GB</p>
  {#each osState.cpusUsage as cpu, index}
    <p>CPU: {index + 1}: {cpu} / 100</p>
  {/each}
{/if}
