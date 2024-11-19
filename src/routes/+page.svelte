<script lang="ts">
  import Detail from "../components/Detail.svelte";
  import Breaker from "../components/Breaker.svelte";
  import ProgressBar from "../components/ProgressBar.svelte";

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
  <div class="os-state-container">
    <h1 class="hostname">{osState.hostname}</h1>
    <Breaker title="General"></Breaker>
    <Detail title="Platform" value={osState.platform} />
    <Detail title="OS version" value={osState.osVersion} />
    <Detail title="Architecture" value={osState.architecture} />
    <Detail title="Temperature" value={osState.temperature} />
    <Breaker title="RAM"></Breaker>
    <ProgressBar
      max={bytesToGb(osState.totalMemory, 1)}
      value={bytesToGb(osState.usedMemory, 1)}
      unit="GB"
    ></ProgressBar>
    <Breaker title="Storage"></Breaker>
    <ProgressBar
      max={bytesToGb(osState.totalStorage, 1)}
      value={bytesToGb(osState.totalStorage - osState.freeStorage, 1)}
      unit="GB"
    ></ProgressBar>
    <Breaker title="CPU"></Breaker>
    {#each osState.cpusUsage as cpu, index}
      <div class="cpu-spec">
        <p>CPU {index + 1}:</p>
        <ProgressBar max={100} value={cpu} unit=""></ProgressBar>
      </div>
    {/each}
  </div>
{/if}

<style>
  .os-state-container {
    border: 1px solid #f5f5f577;
    border-radius: 10px;
    width: 50%;
    min-width: 300px;
    padding: 0 2rem;

    box-shadow: 0 0 40px #f5f5f577;

    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
  }

  :global(.os-state-container > *) {
    max-width: 75%;
  }
  .hostname {
    font-size: 4rem;
    text-align: center;
  }

  @media (max-width: 600px) {
    .hostname {
      font-size: 2rem;
    }
  }

  .cpu-spec {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    column-gap: 4rem;
  }

  .cpu-spec p {
    text-wrap: nowrap;
    margin: 0.5rem 0;
  }
</style>
