from fastapi import FastAPI, File, UploadFile, HTTPException
import pandas as pd
from pydantic import BaseModel
from typing import List


app = FastAPI()

class SNPData(BaseModel):
    rsid: str
    chromosome: str
    position: int
    allele1: str
    allele2: str

@app.post("/upload-dna/", response_model=List[SNPData])
async def upload_dna_file(file: UploadFile = File(...)):
    if file.filename.endswith('.txt'):
        try:
            # Read the file into a DataFrame
            dna_data = pd.read_csv(file.file, sep='\t', comment='#')

            # Validate the data using Pydantic
            snp_list = dna_data.to_dict(orient='records')
            validated_snp_list = [SNPData(**snp) for snp in snp_list]

            return validated_snp_list
        except Exception as e:
            raise HTTPException(status_code=400, detail="Error processing the file")
    else:
        raise HTTPException(status_code=400, detail="Invalid file type. Please upload a .txt file.")