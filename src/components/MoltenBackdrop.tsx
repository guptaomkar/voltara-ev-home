/**
 * Liquid-metal backdrop made from blurred gradient blobs and a few slow
 * specular ribbons. Pure CSS, so it costs almost nothing to animate.
 */
export function MoltenBackdrop() {
  return (
    <div className="molten" aria-hidden="true">
      <span className="molten__blob molten__blob--gold" />
      <span className="molten__blob molten__blob--copper" />
      <span className="molten__blob molten__blob--amber" />
      <span className="molten__blob molten__blob--umber" />
      <span className="molten__ribbon molten__ribbon--a" />
      <span className="molten__ribbon molten__ribbon--b" />
    </div>
  );
}
