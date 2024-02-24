import Image from "next/image";
import { titleFont } from "@/config/fonts";
import { Title } from "@/components/ui/title/Title";

export default function Home() {
  return (
    <>
      <Title title="tienda" subTitle="todos los productos" className="mb-2" />
    </>
  );
}
