# Recipe Uploader (Enterprise)

This is an enterprise-level tool for extracting structured recipe data from Word documents using Google's Gemini API and generating SQL for database import.

## Features
- Modular, testable code
- Robust logging
- CLI interface (argparse)
- Configurable via environment variables or config file
- Handles Gemini's JSON quirks
- Outputs SQL and logs to configurable directories

## Usage
1. Install requirements:
   ```bash
   pip install -r requirements.txt
   ```
2. Set your Gemini API key:
   ```bash
   export GOOGLE_API_KEY='your-api-key-here'
   ```
3. Run the uploader:
   ```bash
   python main.py --input-dir /path/to/recipes --output-dir /path/to/output
   ```

## Structure
- `main.py` - CLI entry point
- `extractor.py` - Gemini extraction logic
- `sql_writer.py` - SQL generation logic
- `config.py` - Configuration management
- `logging_config.py` - Logging setup

## Requirements
- Python 3.8+
- google-generativeai
- python-docx

## License
Enterprise use permitted. See LICENSE file. 