import { Balneario } from "@/types/balnearios";
import DaltonicImage from "@/components/DaltonicImage";
import { notFound } from "next/navigation";
import Map from "@/components/MapWrapper";

export default async function BalnearioDetail({ params }: any) {
    const { id } = params;

    const data = await import("@/mocks/balnearios.json");
    const balnearios: Balneario[] = data.default;

    const balneario = balnearios.find((b) => b.id === id);

    if (!balneario) return notFound();

    // Función para obtener una descripción de nivel de contaminación
    const getContaminationLevel = (value: number) => {
        if (value >= 70) return "Alto"; // 70% o más
        if (value >= 40) return "Medio"; // Entre 40% y 69%
        return "Bajo"; // Menos del 40%
    };

    return (
        <main
            className="flex flex-col items-center justify-center gap-2 px-4 text-center pt-1"
            role="main"
            aria-labelledby="balneario-title"
        >
            <div className="max-w-3xl mx-auto px-4 py-6 space-y-6">
                <h1 id="balneario-title" className="text-3xl font-bold">
                    {balneario.nombre}
                </h1>

                <p className="text-gray-600 text-lg">{balneario.localidad}</p>

                <DaltonicImage
                    src={balneario.imagen}
                    alt={balneario.imagenAlt}
                    width={600}
                    height={400}
                    className="rounded-md"
                />

                <p>{balneario.descripcion}</p>

                <section aria-labelledby="servicios-title">
                    <h2 id="servicios-title" className="text-2xl font-semibold mt-6">
                        Servicios
                    </h2>

                    <ul className="space-y-2" role="list">
                        {balneario.servicios.map((servicio, index) => {
                            const servicioId = `servicio-${index}`;
                            return (
                                <li
                                    key={index}
                                    id={servicioId}
                                    role="listitem"
                                    className="flex items-center gap-2"
                                    aria-label={`${servicio.nombreServicio}: ${
                                        servicio.tiene ? "disponible" : "no disponible"
                                    }`}
                                >
                                    <span
                                        aria-hidden="true"
                                        className={`w-4 h-4 rounded-full ${
                                            servicio.tiene ? "bg-green-500" : "bg-red-400"
                                        }`}
                                    />
                                    <span>{servicio.nombreServicio}</span>
                                </li>
                            );
                        })}
                    </ul>
                </section>

                <section aria-labelledby="indices-contaminacion-title" className="mt-6">
                    <h2 id="indices-contaminacion-title" className="text-2xl font-semibold">
                        Índices de Contaminación
                    </h2>
                    <div className="flex flex-col gap-2 text-left pt-2">
                        <p
                            id="contaminacion-agua-info"
                            aria-live="polite"
                            aria-atomic="true"
                        >
                            <strong className="font-medium">Contaminación del Agua:</strong>{" "}
                            <span
                                className={`font-semibold ${
                                    balneario.contaminacionAgua >= 70 ? "text-red-600" : // Cambiado a 70
                                    balneario.contaminacionAgua >= 40 ? "text-yellow-600" : "text-green-600" // Cambiado a 40
                                }`}
                            >
                                {getContaminationLevel(balneario.contaminacionAgua)}{" "}
                                ({balneario.contaminacionAgua.toFixed(0)}%) {/* .toFixed(0) para enteros y % */}
                            </span>
                            <span className="sr-only">. El valor numérico es {balneario.contaminacionAgua.toFixed(0)} por ciento.</span>
                        </p>
                        <p
                            id="contaminacion-arena-info"
                            aria-live="polite"
                            aria-atomic="true"
                        >
                            <strong className="font-medium">Contaminación de la Arena:</strong>{" "}
                            <span
                                className={`font-semibold ${
                                    balneario.contaminacionArena >= 70 ? "text-red-600" : // Cambiado a 70
                                    balneario.contaminacionArena >= 40 ? "text-yellow-600" : "text-green-600" // Cambiado a 40
                                }`}
                            >
                                {getContaminationLevel(balneario.contaminacionArena)}{" "}
                                ({balneario.contaminacionArena.toFixed(0)}%) {/* .toFixed(0) para enteros y % */}
                            </span>
                            <span className="sr-only">. El valor numérico es {balneario.contaminacionArena.toFixed(0)} por ciento.</span>
                        </p>
                        <p className="text-sm text-gray-500 mt-2">
                            * Los índices de contaminación se muestran en una escala de 0 a 100, donde 0 es muy bajo y 100 es muy alto.
                        </p>
                    </div>
                </section>

                <section aria-labelledby="ubicacion-title" className="mt-8">
                    <h2 id="ubicacion-title" className="text-2xl font-semibold mb-2">
                    Ubicación
                    </h2>
                    <Map
                        lat={balneario.latitud}
                        lng={balneario.longitud}
                        nombre={balneario.nombre}
                    />
                </section>
            </div>
        </main>
    );
}