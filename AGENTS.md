<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

## Architecture rules

- The MBTI test is fully client-side (question bank, 16-type database, and scoring live in `src/data/mbti.ts`); no backend, database, or AI is used for scoring. Why: the assessment is deterministic rule-based self-reflection, and keeping it local keeps results instant and private.

