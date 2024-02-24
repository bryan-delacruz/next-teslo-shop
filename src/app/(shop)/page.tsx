import Image from "next/image";
import { titleFont } from "@/config/fonts";

export default function Home() {
  return (
    <div className="">
      <h1>Hola</h1>
      <h1 className={`${titleFont.className} font-bold`}>Hola</h1>
    </div>
  );
}
