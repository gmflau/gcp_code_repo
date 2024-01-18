import sys
import pandas as pd

filter_value=sys.argv[1]

# Path to the Excel file you want to filter
input_excel_path = 'output/combined_data.xlsx'

# Read the Excel file into a DataFrame
df = pd.read_excel(input_excel_path)

# Specify the column name and the value to filter
filter_column = 'Region'  # Replace with the actual column name

# Apply the filter to the DataFrame
filtered_df = df[df[filter_column] == filter_value]

# Create a new Excel file with the filtered data
output_excel_path = './output/'+ filter_value + '_data.xlsx'
filtered_df.to_excel(output_excel_path, index=False)

print("Filtering completed successfully.")

