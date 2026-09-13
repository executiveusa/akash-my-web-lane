# MyWebLane quality contract

## Primary design rule
The product should make the diagnostic decision easier, not make the implementation look sophisticated. Optimize: user outcome → clarity → trust → ease → speed → accessibility → consistency → delight → visual polish → novelty.

## Diagnostic truth
- Measure before recommending a rebuild or migration.
- Lighthouse/PageSpeed is evidence about measured signals, not proof that WordPress or another CMS should be replaced.
- Provider/quota/timeout failures return an explicit failed measurement; never infer a future score.
- Separate measured fact, inference, and unknown.
- No fake before/after, fake client result, fake migration success, fake testimonial, or fake metric.

## Krug / cognitive-load gate
The user should immediately know: what this is, what it measures, what it cannot prove, what to do next, and whether the action worked. Remove duplicated navigation, SaaS scaffolding, settings, or technical language that does not help that decision.

## Anti-slop / subtraction
Reject generic AI abstractions, gradient-as-identity, repeated rounded-card walls, bento-by-default, glass everywhere, decorative 3D, purposeless marquees/parallax, template testimonials, and motion that delays reading or action. Every element must help understand, decide, act, verify, recover, or succeed.

## Mobile / accessibility
Verify at least 320, 375, 390, 430, and 768 CSS pixels. Zero accidental horizontal overflow. Important touch targets ≈44×44 CSS pixels or larger. Keyboard navigation, focus, forms, errors, contrast, and reduced motion are release requirements.

## Runtime dependency rule
The public diagnostic shell must not require inherited CMS/auth/analytics/template services unless the visible feature genuinely uses them. Stale compiled `.js/.d.ts/.map` artifacts must never shadow current TS/TSX source.

## Gauntlet dimensions
VALUE, MOBILE, TRUTH, WIRING, SECURITY, PERFORMANCE, ACCESSIBILITY, TASTE, COMPLEXITY. Fix all P0/P1 and rerun.

## Collins release bar
Overall/usability/visual/originality/accessibility ≥8.5, primary conversion ≥9.0, zero critical failures, broken controls, mobile overflow, or unverified claims; rollback documented.

## Reference patterns, not automatic installs
Emil Kowalski skills for interaction craft; Unlazy for executable acceptance/evidence; Ponytail for subtraction/YAGNI; Humanizer for removing generic writing tells without changing facts; Ralphy for bounded autonomous loops without adding another orchestrator; Gauntlet Loop for adversarial exit review.