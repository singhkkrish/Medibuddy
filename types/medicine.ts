

export interface OpenFdaBlock {
  brand_name?: string[];
  generic_name?: string[];
  manufacturer_name?: string[];
  substance_name?: string[];
  route?: string[];
  product_type?: string[];
  application_number?: string[];
}

export interface DrugLabel {
  
  id?: string;
  set_id?: string;

  openfda: OpenFdaBlock;

  purpose?: string[];
  indications_and_usage?: string[];
  warnings?: string[];
  warnings_and_cautions?: string[];
  dosage_and_administration?: string[];
  active_ingredient?: string[];
  inactive_ingredient?: string[];
  do_not_use?: string[];
  stop_use?: string[];
  when_using?: string[];
  ask_doctor?: string[];
  pregnancy_or_breast_feeding?: string[];
  storage_and_handling?: string[];
}

export interface OpenFdaSearchResponse {
  meta: {
    results: {
      skip: number;
      limit: number;
      total: number;
    };
  };
  results: DrugLabel[];
}


export interface MedicineSummary {
  slug: string;
  brandName: string;
  genericName: string | null;
  manufacturer: string | null;
  route: string | null;
  raw: DrugLabel;
}

