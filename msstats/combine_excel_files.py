import pandas as pd
import glob

# Specify the path to the folder containing your Excel files
folder_path = './reports/*.xlsx'

# Get a list of all Excel files in the folder
excel_files = glob.glob(folder_path)

# Initialize an empty DataFrame to store the combined data
combined_data = pd.DataFrame()

# Loop through each Excel file and append its contents to the combined_data DataFrame
for file in excel_files:
    # Read the Excel file into a DataFrame excluding the header row
    df = pd.read_excel(file)
    
    # Append the DataFrame to the combined_data DataFrame
    combined_data = combined_data._append(df, ignore_index=True)

# Save the combined data to a new Excel file
combined_data.to_excel('./output/combined_data.xlsx', index=False)

print("Combination completed successfully.")
