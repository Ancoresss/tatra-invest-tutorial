import os

# Define the root directory and subdirectories to search
root_dir = '../client/src'
sub_dirs = [ 'lib']
extensions = ['.js', '.jsx', '.tsx', '.ts']


def consolidate_code_files(root, subdirectories, output_file):
    """
    Consolidates code files from specified subdirectories into a single file.

    Args:
    - root: The root directory where subdirectories are located.
    - subdirectories: A list of subdirectory names to include in the search.
    - output_file: The path to the output file where the consolidated code will be saved.
    """
    with open(output_file, 'w') as outfile:
        # Iterate through each subdirectory
        for sub in subdirectories:
            # Generate full path to the subdirectory
            sub_path = os.path.join(root, sub)

            # Walk through the subdirectory
            for dirpath, dirnames, filenames in os.walk(sub_path):
                # Filter and process each file
                for filename in [f for f in filenames if os.path.splitext(f)[1] in extensions]:
                    file_path = os.path.join(dirpath, filename)
                    with open(file_path, 'r') as infile:
                        # Append the file content to the output file
                        outfile.write(infile.read() + '\n\n')  # Added a newline as a simple separator


if __name__ == "__main__":
    output_file_path = 'data/codebase.txt'
    consolidate_code_files(root_dir, sub_dirs + [root_dir], output_file_path)
    print(f"All code files have been consolidated into {output_file_path}")