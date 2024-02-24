import { notFound } from "next/navigation";

interface Props {
  params: {
    id: string;
  }
}

export default function ({ params }: Props) {

  const { id } = params

  if (id === "3-pers") {
    notFound()
  }

  return (
    <div>
      <h1>Category {id}</h1>
    </div>
  );
}