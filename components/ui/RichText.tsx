import { Fragment } from "react";

/** Splits "Woven with *discipline*." into plain and italic runs. */
export function parseRich(text: string): { text: string; em: boolean }[] {
  return text
    .split(/(\*[^*]+\*)/g)
    .filter(Boolean)
    .map((part) =>
      part.startsWith("*") && part.endsWith("*")
        ? { text: part.slice(1, -1), em: true }
        : { text: part, em: false },
    );
}

export const stripRich = (text: string) => text.replace(/\*/g, "").replace(/\n/g, " ");

export function RichText({ text }: { text: string }) {
  return (
    <>
      {text.split("\n").map((line, li) => (
        <Fragment key={li}>
          {li > 0 && <br />}
          {parseRich(line).map((p, i) =>
            p.em ? (
              <em key={i} className="em">
                {p.text}
              </em>
            ) : (
              <Fragment key={i}>{p.text}</Fragment>
            ),
          )}
        </Fragment>
      ))}
    </>
  );
}
