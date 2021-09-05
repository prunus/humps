import { UpperLetters } from './Letters'

export type LettersWalk<
  P extends string,
  T extends string,
  S extends string = '',
  SS extends string = P extends '' ? '' : S
> = T extends `${ infer T1 }${ infer T2 }${ infer T3 }${ infer T4 }${ infer T5 }${ infer TN }`
  ? T1 extends '_' | '-'

    ? LettersWalk<`${ P }${ SS }${ Uppercase<T2> }`, `${ T3 }${ T4 }${ T5 }${ TN }`, S>

    : T1 extends UpperLetters

      ? LettersWalk<`${ P }${ SS }${ T1 }`, `${ T2 }${ T3 }${ T4 }${ T5 }${ TN }`, S>

      : T2 extends '_' | '-'

        ? LettersWalk<`${ P }${ T1 }${ SS }${ Uppercase<T3> }`, `${ T4 }${ T5 }${ TN }`, S>

        : T2 extends UpperLetters

          ? LettersWalk<`${ P }${ T1 }${ SS }${ T2 }`, `${ T3 }${ T4 }${ T5 }${ TN }`, S>

          : T3 extends '_' | '-'

            ? LettersWalk<`${ P }${ T1 }${ T2 }${ SS }${ Uppercase<T4> }`, `${ T5 }${ TN }`, S>

            : T3 extends UpperLetters

              ? LettersWalk<`${ P }${ T1 }${ T2 }${ SS }${ T3 }`, `${ T4 }${ T5 }${ TN }`, S>

              : T4 extends '_' | '-'

                ? LettersWalk<`${ P }${ T1 }${ T2 }${ T4 }${ SS }${ Uppercase<T5> }`, TN, S>

                : T4 extends UpperLetters

                  ? LettersWalk<`${ P }${ T1 }${ T2 }${ T3 }${ SS }${ T4 }`, `${ T5 }${ TN }`, S>

                  : T5 extends UpperLetters

                    ? LettersWalk<`${ P }${ T1 }${ T2 }${ T3 }${ T4 }${ SS }${ T5 }`, TN, S>

                    : LettersWalk<`${ P }${ T1 }${ T2 }${ T3 }${ T4 }`, `${ T5 }${ TN }`, S>

  : T extends `${ infer T1 }${ infer TN }`

    ? T1 extends '_' | '-'

      ? LettersWalk<`${ P }${ SS }`, TN, S>

      : T1 extends UpperLetters

        ? LettersWalk<`${ P }${ SS }${ T1 }`, TN, S>

        : LettersWalk<`${ P }${ T1 }`, TN, S>

    : `${ P }${ T }`
