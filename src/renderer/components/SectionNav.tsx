import React, { useEffect, useState } from "react";

// Quick links to the sections of the form, like the menu bar of the Mario Kart Channel.
// The list follows the sections currently shown (it changes with the layout and the options).
export function SectionNav() {
  const [sections, setSections] = useState<string[]>([]);

  useEffect(() => {
    function collect() {
      const legends = Array.from(document.querySelectorAll("fieldset.main-form fieldset > legend"));
      const names = legends.map((legend) => (legend.textContent || "").trim()).filter((name) => name !== "");
      setSections((old) => (old.join("\n") === names.join("\n") ? old : names));
    }
    collect();
    const observer = new MutationObserver(collect);
    observer.observe(document.body, {childList: true, subtree: true});
    return () => observer.disconnect();
  }, []);

  function jumpTo(index: number) {
    const legends = document.querySelectorAll("fieldset.main-form fieldset > legend");
    const legend = legends[index];
    if (legend !== undefined) {
      legend.scrollIntoView({behavior: "smooth", block: "start"});
    }
  }

  if (sections.length === 0) {
    return null;
  }

  return (
    <nav className="section-nav">
      {sections.map((name, index) => (
        <button type="button" className="section-nav__item" key={`${index}-${name}`} onClick={() => jumpTo(index)}>
          <span className="section-nav__star" aria-hidden="true">★</span>{name}
        </button>
      ))}
    </nav>
  );
}
