import api from "./axios";


export default class RequestToApi {
    static async login(login, password) {
        return api.post("/api/v1/account/login", { login: login, password: password });
    }

    static async getInfo() {
        return api.get("/api/v1/account/info");
    }

    static async getHistograms(inn, tonality, limit, selectedStartDate, selectedEndDate, maxCopmleteness, bussinesContext, mainRole, notice) {
        const data = this.buildHistogramRequest(inn, tonality, limit, selectedStartDate, selectedEndDate, maxCopmleteness, bussinesContext, mainRole, notice);
        return api.post("/api/v1/objectsearch/histograms", data);
    }

    static async getPublicationsList(inn, tonality, limit, selectedStartDate, selectedEndDate, maxCopmleteness, bussinesContext, mainRole, notice) {
        const data = this.buildHistogramRequest(inn, tonality, limit, selectedStartDate, selectedEndDate, maxCopmleteness, bussinesContext, mainRole, notice);
        return api.post("/api/v1/objectsearch", data);
    }

    static async getDocuments(ids) {
        return api.post("/api/v1/documents", { ids: ids });
    }

    static buildHistogramRequest(inn, tonality, limit, selectedStartDate, selectedEndDate, maxCopmleteness, bussinesContext, mainRole, notice) {
        return {
            intervalType: "month",
            
            histogramTypes: [
                "totalDocuments",
                "riskFactors"
            ],

            issueDateInterval: {
                startDate: selectedStartDate,
                endDate: selectedEndDate
            },

            searchContext: {
                targetSearchEntitiesContext: {
                  targetSearchEntities: [
                    {
                      type: "company",
                      inn: inn,
                      maxFullness: maxCopmleteness,
                      inBusinessNews: bussinesContext
                    }
                  ],
  
                  onlyMainRole: mainRole,
                  tonality: tonality,
                  onlyWithRiskFactors: false
                }
            },
            
            similarMode: "duplicates",
            limit: limit,
            sortType: "sourceInfluence",
            sortDirectionType: "desc",

            attributeFilters: {
                excludeTechNews: true,
                excludeAnnouncements: notice,
                excludeDigests: true
            }
        }
    }
}
