import chikungunyaData from './chikungunya.json';
import dengueClasicoData from './dengue_clasico.json';
import dengueHemorragicoData from './dengue_hemorragico.json';
import paludismoData from './paludismo.json';
import zikaData from './zika.json';

const allDiseaseData = [
  chikungunyaData,
  dengueClasicoData,
  dengueHemorragicoData,
  paludismoData,
  zikaData
];

const processSintomas = (dataSources) => {

  const sintomasMap = new Map();
  let uniqueId = 1; 
  dataSources.forEach(disease => {
    if (disease.sintomatologia) {

      disease.sintomatologia.forEach(sintoma => {
        
        const nombreSintoma = sintoma.nombre.trim();
        const otrosNombres = sintoma.otros_nombres || [];

        if (!sintomasMap.has(nombreSintoma)) {

          sintomasMap.set(nombreSintoma, {
            id: uniqueId++,
            nombre: nombreSintoma,

            sinonimos: new Set(otrosNombres)
          });
        } else {

          const existing = sintomasMap.get(nombreSintoma);

          otrosNombres.forEach(sin => existing.sinonimos.add(sin));
        }
      });
    }
  });

  const sintomasList = Array.from(sintomasMap.values()).map(s => ({
    ...s,

    sinonimos: Array.from(s.sinonimos)
  }));

  return sintomasList;
};

export const mockSintomas = processSintomas(allDiseaseData);