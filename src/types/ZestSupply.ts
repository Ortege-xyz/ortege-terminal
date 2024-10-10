// src/types/ZestSupply.ts

export interface ZestSupply {
    id: number; // Unique identifier for the DataGrid
    sender_address: string;
    asset_id: string;
    total_supplied: number;
    total_borrowed: number;
    total_repaid: number;
    total_withdrawn: number;
  }
  