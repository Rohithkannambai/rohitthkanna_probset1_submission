# REFLECTION.md — Ting Ting Safety Review

**Student:** Rohith Kanna  
**Course:** MGMT 6110 · Human-AI Collaboration · Problem Set 1

## Q1 — Who are your users, and what changes for them?

My user is an **internal Content Safety Moderator**, represented by Maya Tan, working in Ting Ting’s Trust & Safety / Content Moderation Operations function. The prototype models one moderator working through ten fictional cases. I did not have access to a real Ting Ting operation, so I did not measure an actual “before” time or claim a specific number of minutes saved. The workflow I designed against was: receive cases routed for human review, decide which case to handle, open the video and case context, check the relevant policy and system recommendation, choose the final action and decision basis, record the decision, then return to the queue.

The product changes two parts of that flow. Screen 1 turns the queue into an intake decision: pending cases are ordered by **Priority (Top → Medium → Low)** and then by longest queue age, so the moderator sees what should be handled first. Screen 2 then brings the evidence, policy context, system recommendation, Final Action, Decision Basis and Moderator Note into one workspace. After confirmation, the case returns as Completed and the counts update. The main change is therefore not “a dashboard”; it is a clearer sequence for prioritising and completing the human review step already owned by the moderation function.

## Q2 — Augmented capacity and constrained capacity

The pairing increased my implementation capacity. I could move from approved interface ideas to a functioning React application with search, three filters, state transitions, video review, a confirmation flow, Policy Center, About, Community Guidelines, scroll synchronisation and responsive layouts. My time shifted away from manually writing every component and toward deciding what the workflow should be, checking the preview and specifying corrections. That let me attempt a much richer working front end within the assignment window than I would have attempted by manually building each interaction.

The constraint was that **verification became the bottleneck**. AI Studio could change several files quickly, but its completion message was not evidence that the product was correct. I repeatedly had to compare the preview with the intended design, click filters, scroll overlays, inspect GitHub, and test real video playback. Quota also changed my sequencing: I postponed some mobile and expanded-video work because generations were limited. The clearest late example was the one-data-file refactor. The instruction was structural, but the generated result rewrote case IDs, handles, scenarios and media mappings. AI increased how much I could build, but it also increased the amount of generated output I had to judge before accepting it.

## Q3 — In the loop, on the loop, out of the loop: where was my judgment actually needed?

My strongest in-the-loop moment came after the broad **FINAL VISUAL FIDELITY + MOBILE QA PASS**. My prompt log records: **“The broad QA prompt caused regressions: previously working dropdowns stopped working and the Internal News presentation changed in ways I did not want.”** I rejected that version, restored the previous stable build and changed my prompting strategy to narrow, surgical fixes. My judgment changed both the product outcome and the way I worked with the agent. If I had accepted the model’s completion message, a supposedly improved version would have shipped with broken interactions.

I also had a moment where I was only nominally in the loop. After Screen 2 and the confirmation modal first opened, I said, **“so i guess the prompt worked.”** I had mainly verified that the screens opened and relied too much on the implementation summary. Later I found the oversized video and scroll-position problems. That showed me that having a human present does not automatically create meaningful oversight. The human needs an acceptance test and must actually exercise it.

## Q4 — What did it build that I never sketched?

The most important unsketched part was hidden in the generated project rather than visible in the interface. During my late compliance audit I found AI Studio scaffold artifacts for Gemini even though Ting Ting did not need a model at runtime: `@google/genai` was declared in `package.json`, Gemini capability metadata remained, and an `.env.example` referred to a Gemini API key. I had asked for a front-end moderation prototype, so I had not consciously chosen any of those dependencies.

I noticed this only near the end, when I deliberately checked the codebase for model/API-key and external-runtime dependencies before deployment. I removed the unused scaffold artifacts before shipping. I could have caught this much sooner by inspecting `package.json`, metadata and environment files immediately after the first scaffold, and by running a simple repository search for `KEY`, `TOKEN`, `GEMINI` and model imports before spending time on visual polish. The preview showed me the front of the product; it did not show me every architectural default the builder had chosen.

## Q5 — Learning pointers for an organisational context

1. **Require a recoverable checkpoint before any broad or multi-file agent change, and default to one behaviour or component per iteration.** My broad visual-QA pass broke working dropdowns, and Versions allowed me to recover instead of stacking another fix on top of the regression.

2. **Define “done” as an independent functional check at the destination, not the agent’s completion message.** Media integration was reported as complete before the files actually worked, and Policy Center initially opened but used the wrong general-entry state. Managers should require a short acceptance test for the actual rendered workflow before generated work is approved.

3. **Audit generated architecture and invariant data separately from interface quality.** The scaffold introduced unused Gemini/key-related artifacts, and a late structural refactor unexpectedly rewrote approved case and media data. For organisational use, I would require an early dependency/security scan and explicit invariant checks — for example, fixed IDs, row counts and asset paths — before accepting a refactor that is supposed to be structural only.
