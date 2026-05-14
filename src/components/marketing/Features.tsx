import { CalendarDays, ShieldCheck, TrendingUp } from "lucide-react";

const features = [
    {
        title: "Plan each pay period",
        description: "See what is already committed before you spend.",
        icon: CalendarDays,
    },
    {
        title: "Protect your reserves",
        description: "Set money aside for bills, savings, and priorities.",
        icon: ShieldCheck,
    },
    {
        title: "Know what is safe",
        description: "Understand what you can spend without guessing.",
        icon: TrendingUp,
    },
];

type FeatureListProps = {
    layout?: "horizontal" | "vertical";
    variant?: "card" | "simple";
};

export default function Features({ layout = "horizontal", variant }: FeatureListProps) {

    return (
        <div className={layout === "horizontal" ? "grid gap-6 md:grid-cols-3" : "flex flex-col gap-6"}>
            {features.map((feature) => {

                const Icon = feature.icon;

                return (
                    <div
                        key={feature.title}
                        className={
                            variant === "card"
                                ? "flex items-start gap-4 rounded-2xl border border-slate-200 p-6"
                                : "flex items-start gap-4 p-2"
                        }
                    >
                        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                            <Icon size={35} strokeWidth={2.4} />
                        </div>

                        <div>
                            <h3 className="text-lg font-semibold text-slate-950">
                                {feature.title}
                            </h3>

                            <p className="mt-2 text-sm leading-6 text-slate-600">
                                {feature.description}
                            </p>
                        </div>
                    </div>
                )
            })}

        </div>


    )
}