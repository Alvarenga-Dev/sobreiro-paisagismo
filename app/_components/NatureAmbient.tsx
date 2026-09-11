export interface NatureAmbientProps {
  variant: "home" | "about";
}

export function NatureAmbient({ variant }: NatureAmbientProps) {
  return (
    <span
      className={`natureAmbient natureAmbient--${variant}`}
      data-ambient-motion="nature"
      aria-hidden="true"
    >
      <svg
        className="natureAmbient__canvas"
        viewBox="0 0 1440 900"
        preserveAspectRatio="xMidYMid slice"
        focusable="false"
      >
        <g className="natureAmbient__light natureAmbient__light--one">
          <ellipse cx="1120" cy="170" rx="260" ry="180" />
        </g>
        <g className="natureAmbient__light natureAmbient__light--two">
          <ellipse cx="940" cy="620" rx="340" ry="210" />
        </g>

        <g className="natureAmbient__breeze natureAmbient__breeze--upper">
          <path d="M640 190C830 120 1044 128 1234 207C1330 247 1405 250 1500 213" />
          <path d="M760 250C917 205 1071 224 1204 286C1298 330 1383 336 1480 300" />
        </g>
        <g className="natureAmbient__breeze natureAmbient__breeze--lower">
          <path d="M720 585C890 520 1057 526 1206 596C1307 643 1403 646 1510 594" />
          <path d="M610 682C798 619 983 634 1147 710C1272 768 1390 763 1515 699" />
        </g>

        <g className="natureAmbient__pollen natureAmbient__pollen--far">
          <circle data-pollen-grain="true" cx="720" cy="180" r="1.5" />
          <circle data-pollen-grain="true" cx="842" cy="274" r="1.2" />
          <circle data-pollen-grain="true" cx="965" cy="134" r="1.4" />
          <circle data-pollen-grain="true" cx="1075" cy="326" r="1.3" />
          <circle data-pollen-grain="true" cx="1198" cy="207" r="1.6" />
          <circle data-pollen-grain="true" cx="1320" cy="352" r="1.2" />
          <circle data-pollen-grain="true" cx="762" cy="492" r="1.4" />
          <circle data-pollen-grain="true" cx="916" cy="606" r="1.2" />
          <circle data-pollen-grain="true" cx="1064" cy="518" r="1.5" />
          <circle data-pollen-grain="true" cx="1226" cy="692" r="1.3" />
          <circle data-pollen-grain="true" cx="1364" cy="548" r="1.5" />
        </g>

        <g className="natureAmbient__pollen natureAmbient__pollen--mid">
          <circle data-pollen-grain="true" cx="676" cy="350" r="2.4" />
          <circle data-pollen-grain="true" cx="804" cy="220" r="2.8" />
          <circle data-pollen-grain="true" cx="900" cy="420" r="2.2" />
          <circle data-pollen-grain="true" cx="1012" cy="260" r="2.6" />
          <circle data-pollen-grain="true" cx="1128" cy="438" r="2.3" />
          <circle data-pollen-grain="true" cx="1268" cy="294" r="2.7" />
          <circle data-pollen-grain="true" cx="1395" cy="456" r="2.2" />
          <circle data-pollen-grain="true" cx="734" cy="650" r="2.5" />
          <circle data-pollen-grain="true" cx="870" cy="748" r="2.2" />
          <circle data-pollen-grain="true" cx="1028" cy="666" r="2.7" />
          <circle data-pollen-grain="true" cx="1162" cy="784" r="2.4" />
          <circle data-pollen-grain="true" cx="1338" cy="710" r="2.8" />
        </g>

        <g className="natureAmbient__pollen natureAmbient__pollen--near">
          <ellipse data-pollen-grain="true" cx="850" cy="332" rx="4.8" ry="3.8" />
          <circle data-pollen-grain="true" cx="980" cy="540" r="4.2" />
          <ellipse data-pollen-grain="true" cx="1110" cy="188" rx="5.2" ry="4" />
          <circle data-pollen-grain="true" cx="1215" cy="485" r="4.6" />
          <ellipse data-pollen-grain="true" cx="1370" cy="265" rx="4.5" ry="3.5" />
          <circle data-pollen-grain="true" cx="790" cy="758" r="4.1" />
          <ellipse data-pollen-grain="true" cx="1102" cy="720" rx="5.4" ry="4.1" />
          <circle data-pollen-grain="true" cx="1315" cy="630" r="4.4" />
        </g>
      </svg>
    </span>
  );
}
