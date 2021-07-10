import moment from 'moment'

// update moment to use short timestamps
export default function shortFromNow() {
  moment.updateLocale('en', {
    relativeTime: {
      future: "in %s",
      past: "%s ago",
      s: '%ds',
      ss: '%ds',
      m: "%dm",
      mm: "%dm",
      h: "%dh",
      hh: "%dh",
      d: "%dd",
      dd: "%dd",
      M: "%dmo",
      MM: "%dmo",
      y: "%dy",
      yy: "%dy"
    }
  });
}