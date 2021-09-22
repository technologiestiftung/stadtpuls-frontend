import { definitions } from "@common/types/supabase";

export const categories: definitions["categories"][] = [
  {
    id: 1,
    name: "CO2",
    description:
      "Ein CO2-Sensor kann die Kohlendioxid-Konzentration in Räumen überwachen. Für eine gute Raumluftqualität sollte der Grenzwert von 1000 ppm CO2 (Erdatmosphäre ca. 400 ppm) nicht überschritten werden.",
  },
  {
    id: 2,
    name: "Temperatur",
    description:
      "Handelsübliche Temperatursensoren messen die Temperatur (meist in Grad Celsius) in einer Spanne von -55 bis 125°C. Übrigens: die mittlere globale Durchschnittstemperatur liegt bei ca. +14 °C.",
  },
  {
    id: 3,
    name: "Luftfeuchtigkeit",
    description:
      "Ein Luftfeuchtesensor gibt die absolute Luftfeuchte in Gramm Wasserdampf pro m3 Luft an. Dabei gilt: Je höher die Temperatur, desto mehr Wasser kann die Luft aufnehmen (bspw. bei 30 °C ca. 30 g/m³).",
  },
  {
    id: 4,
    name: "Luftdruck",
    description:
      "Luftdrucksensoren messen den Druck, der durch die Gewichtskraft einer Luftsäule auf der Erdoberfläche entsteht. Der mittlere Luftdruck auf der Erde (Höhe = 0 m) beträgt rund 1.013 hPa bzw. 1,013 bar.",
  },
  {
    id: 5,
    name: "Unit Counter",
    description:
      "Unit Counter können bspw. Handys in der Umgebung anhand ihrer WLAN- und Bluetooth-Signale zählen. Damit eignen sie sich gut, um Besucherströme und Auslastungen an einem bestimmten Ort zu bestimmen.",
  },
  {
    id: 6,
    name: "Lautstärke",
    description:
      "Ein Lautstärkesensor erfasst die Umgebungsgeräusche (Lautstärke) in Form des Schalldrucks und gibt die Messwerte in Dezibel aus. Als Referenz: ein Staubsauger erreicht einen Schalldruck von ca. 70 dB.",
  },
];
