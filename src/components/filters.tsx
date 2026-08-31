import { useProductStore } from "@/store/useProductsStore";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "./ui/accordion";
import { Checkbox } from "./ui/checkbox";
import { Label } from "./ui/label";

export default function Filters() {
  const { setPriceFilter, setAvailabilityFilter } = useProductStore();

  const priceFilters: { id: string; label: string; range: [number, number] }[] = [
    { id: "range1", label: "1000 - 1100 L.", range: [1000, 1100] },
    { id: "range2", label: "1100 - 1200 L.", range: [1100, 1200] },
    { id: "range3", label: "1200 - 1300 L.", range: [1200, 1300] },
  ];

  return (
    // border-2 border-amber-200
    <div className="text-white h-fit w-11/12 sm:w-96 m-4 mt-8 sm:mt-13">
      <h1 className="text-4xl font-[plus_jakarta_sans]">Filtros</h1>
      <Accordion type="multiple">
        <AccordionItem value="item-1">
          <AccordionTrigger className="font-[plus_jakarta_sans]">Precio</AccordionTrigger>
          <AccordionContent>
            <AccordionContent>
              {priceFilters.map(({ id, label, range }) => (
                <div key={id} className="flex items-center space-x-2 h-10">
                  <Checkbox id={id} onCheckedChange={(checked) => setPriceFilter(checked ? range : null)} />
                  <Label htmlFor={id} className="font-[plus_jakarta_sans]">
                    {label}
                  </Label>
                </div>
              ))}
            </AccordionContent>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-2">
          <AccordionTrigger className="font-[plus_jakarta_sans]">Disponibilidad</AccordionTrigger>
          <AccordionContent>
            <div className="flex items-center space-x-2 h-10">
              <Checkbox
                id="available"
                onCheckedChange={(checked) => setAvailabilityFilter(checked ? "available" : null)}
              />
              <Label htmlFor="available" className="font-[plus_jakarta_sans]">
                Disponible
              </Label>
            </div>
            <div className="flex items-center space-x-2 h-10">
              <Checkbox
                id="unavailable"
                onCheckedChange={(checked) => setAvailabilityFilter(checked ? "unavailable" : null)}
              />
              <Label htmlFor="unavailable" className="font-[plus_jakarta_sans]">
                No Disponible
              </Label>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
}
