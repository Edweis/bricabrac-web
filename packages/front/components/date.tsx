import React from "react";
import { parseISO, format } from "date-fns";

type Props = { dateString: string };
export default function Date({ dateString }: Props) {
  const date = parseISO(dateString);
  const text = format(date, "LLLL d, yyyy");
  return <time dateTime={dateString}>{text}</time>;
}
