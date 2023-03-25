<script>
  import { createClient } from "@supabase/supabase-js";
  import { onMount } from "svelte";
  export let slug;
  export let position = "fixed";
  export let title = "Finished?";
  let count = 0;
  let total = 0;
  let checked = false;

  if (localStorage.getItem("exercise_completions") === null) {
    console.log("ITS NOT THERE");
    const obj = {};
    obj[slug] = false;
    localStorage.setItem("exercise_completions", JSON.stringify(obj));
  }
  const storage = localStorage.getItem("exercise_completions");
  const parsed = JSON.parse(storage);
  checked = parsed[slug];

  const supabaseUrl = "https://uwrwptibotlxlvcdeicv.supabase.co";
  const supabaseKey =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InV3cndwdGlib3RseGx2Y2RlaWN2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2NjQ3OTI4MDYsImV4cCI6MTk4MDM2ODgwNn0.FuHj1T6qJO-wQ_aWaaXNFVfZPG45FsnE3RvHd3PGQmA";
  const supabase = createClient(supabaseUrl, supabaseKey);
  async function toggle(e) {
    const procedure = checked ? "increment" : "decrement";
    const { data, error } = await supabase.rpc(procedure, {
      slug_text: slug,
    });
    const storage = localStorage.getItem("exercise_completions");
    const parsed = JSON.parse(storage);
    parsed[slug] = checked;
    localStorage.setItem("exercise_completions", JSON.stringify(parsed));
  }
  //TODO: blur on click, it traps the space key
  onMount(async () => {
    let { data, error } = await supabase
      .from("exercise_completion")
      .select("total, count")
      .eq("slug", slug)
      .maybeSingle();
    total = data.total;
    count = data.count;

    const exerciseCompletion = supabase
      .channel("custom-update-channel")
      .on(
        "postgres_changes",
        {
          event: "UPDATE",
          schema: "public",
          table: "exercise_completion",
          filter: `slug=eq.${slug}`,
        },
        (payload) => {
          //TODO: nok overflødig nu hvor der kom filter på
          if (payload.new.slug === slug) {
            //console.log("Change received!", payload);
            count = payload.new.count;
          }
        }
      )
      .subscribe();
  });
</script>

<fieldset style={`--position: ${position}`}>
  <legend>{title}</legend>
  <p>{count} / {total}</p>

  <label class="switch">
    <input type="checkbox" bind:checked on:change={toggle} />
    <span class="slider" />
  </label>
</fieldset>

<style>
  fieldset * {
    font-size: 0.5em;
  }
  fieldset {
    border: 1px solid #fff;
    padding: 1rem;
    display: inline-block;
    position: var(--position);
    top: 0;
    right: 0;
  }
  fieldset p {
    font-weight: bold;
    margin: 0;
    padding: 0;
  }
  .switch {
    position: relative;
    display: inline-block;
    width: 60px;
    height: 34px;
  }

  .switch input {
    opacity: 0;
    width: 0;
    height: 0;
  }

  .slider {
    position: absolute;
    cursor: pointer;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: #ccc;
    -webkit-transition: 0.4s;
    transition: 0.4s;
    border-radius: 34px;
  }

  .slider:before {
    position: absolute;
    content: "";
    height: 26px;
    width: 26px;
    left: 4px;
    bottom: 4px;
    background-color: white;
    -webkit-transition: 0.4s;
    transition: 0.4s;
    border-radius: 50%;
  }

  input:checked + .slider {
    background-color: #2196f3;
  }

  input:checked + .slider {
    box-shadow: 0 0 1px #2196f3;
  }

  input:checked + .slider:before {
    -webkit-transform: translateX(26px);
    -ms-transform: translateX(26px);
    transform: translateX(26px);
  }
</style>
