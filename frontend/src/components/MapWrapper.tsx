"use client";

import dynamic from "next/dynamic";

const LeafletMap = dynamic(() => import("./Map"), { ssr: false });

interface Props {
  lat: number;
  lng: number;
  nombre: string;
}

export default function MapWrapper({ lat, lng, nombre }: Props) {
  return <LeafletMap lat={lat} lng={lng} nombre={nombre} />;
}
