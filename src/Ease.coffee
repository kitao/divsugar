DivSugar.Ease =
  linear: (t) -> t

  quadIn : (t) -> Math.pow t, 2
  cubicIn: (t) -> Math.pow t, 3
  quartIn: (t) -> Math.pow t, 4
  quintIn: (t) -> Math.pow t, 5

  quadOut : (t) -> 1 - Math.pow 1 - t, 2
  cubicOut: (t) -> 1 - Math.pow 1 - t, 3
  quartOut: (t) -> 1 - Math.pow 1 - t, 4
  quintOut: (t) -> 1 - Math.pow 1 - t, 5

  quadInOut : (t) -> if t < 0.5 then Math.pow(t * 2, 2) * 0.5 else 1 - Math.abs(Math.pow(2 - t * 2, 2)) * 0.5
  cubicInOut: (t) -> if t < 0.5 then Math.pow(t * 2, 3) * 0.5 else 1 - Math.abs(Math.pow(2 - t * 2, 3)) * 0.5
  quartInOut: (t) -> if t < 0.5 then Math.pow(t * 2, 4) * 0.5 else 1 - Math.abs(Math.pow(2 - t * 2, 4)) * 0.5
  quintInOut: (t) -> if t < 0.5 then Math.pow(t * 2, 5) * 0.5 else 1 - Math.abs(Math.pow(2 - t * 2, 5)) * 0.5
