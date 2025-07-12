# Document Preview Enhancement - Real .docx Content Viewing

## ✅ What's New

I have enhanced the document preview feature to show the **actual content** of uploaded .docx files, not just placeholder text.

### 🎯 **Real Document Content Preview**

**Before**: Generic placeholder text
```
Document: filename.docx
This is a preview of the uploaded Word document...
```

**Now**: Actual extracted content from the .docx file
```
Breakfast Gourmet Week A

Component: Main Dish
Ingredient | Quantity | Unit | Calories
Chicken Breast | 200 | g | 165
Olive Oil | 15 | ml | 135

Component: Side Dish  
Ingredient | Quantity | Unit | Calories
Brown Rice | 100 | g | 111
Vegetables | 150 | g | 50
```

## 🔧 **Technical Implementation**

### **Enhanced Python Script** (`scripts/extract_recipe.py`)
```python
def extract_document_content(docx_path):
    """Extract all text content from the Word document."""
    try:
        doc = Document(docx_path)
        content = []
        
        # Extract paragraphs
        for para in doc.paragraphs:
            if para.text.strip():
                content.append(para.text)
        
        # Extract table content
        for table in doc.tables:
            content.append("")  # Add spacing
            for row in table.rows:
                row_text = " | ".join([cell.text.strip() for cell in row.cells])
                if row_text.strip():
                    content.append(row_text)
            content.append("")  # Add spacing
        
        return "\n".join(content)
    except Exception as e:
        logger.error(f"Error extracting document content: {e}")
        return "Error extracting document content"
```

### **Updated API Response** (`/api/upload-recipe`)
```typescript
// Now returns both recipe data AND document content
return NextResponse.json({
  success: true,
  fileName,
  recipe: extractionResult.recipe,
  documentContent: extractionResult.documentContent  // NEW
});
```

### **Enhanced UI Components**

#### **DocumentPreview.tsx**
- **Real Content Display**: Shows actual .docx content
- **Better Formatting**: Monospace font with proper spacing
- **Scrollable Content**: Handles long documents
- **Fallback Handling**: Shows error message if extraction fails

#### **RecipeUploader.tsx**
- **Content Storage**: Stores document content in state
- **Preview Integration**: Passes real content to preview component
- **State Management**: Proper cleanup of document content

## 🎨 **User Experience**

### **Dual View Preview**
```
┌─────────────────────────────────────────────────────────────┐
│ Document Preview: Breakfast Gourmet Week A.docx            │
├─────────────────────────────────────────────────────────────┤
│ [Extracted Data] [Raw Content]                             │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│ EXTRACTED DATA VIEW:                                        │
│ ┌─ Component: Main Dish ─────────────────────────────────┐ │
│ │ Ingredient    │ Qty │ Unit │ Cal │ Fat │ Protein │ Carbs│ │
│ │ Chicken Breast│ 200 │ g    │ 165 │ 3.6 │ 31.0   │ 0    │ │
│ └─────────────────────────────────────────────────────────┘ │
│                                                             │
│ RAW CONTENT VIEW:                                           │
│ Breakfast Gourmet Week A                                   │
│                                                             │
│ Component: Main Dish                                       │
│ Ingredient | Quantity | Unit | Calories                    │
│ Chicken Breast | 200 | g | 165                            │
│ Olive Oil | 15 | ml | 135                                 │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

### **Content Extraction Features**
- **Paragraphs**: All text paragraphs are extracted
- **Tables**: Table content is formatted with pipe separators
- **Spacing**: Proper spacing between sections
- **Error Handling**: Graceful fallback if extraction fails

## 📊 **Content Format**

### **Extracted Content Structure**
```
Document Title

Component: Component Name
Ingredient | Quantity | Unit | Calories | Fat | Protein | Carbs
Ingredient1 | 100 | g | 150 | 5.0 | 10.0 | 15.0
Ingredient2 | 50 | ml | 75 | 8.0 | 2.0 | 5.0

Component: Another Component
Ingredient | Quantity | Unit | Calories
Ingredient3 | 200 | g | 300
```

### **Benefits**
- **Verification**: Users can see exactly what was in the original document
- **Comparison**: Easy to compare extracted data with original content
- **Debugging**: Helps identify extraction issues
- **Transparency**: Full visibility into the extraction process

## 🚀 **Usage**

### **1. Upload Document**
- Select .docx file
- Click "Upload and Extract Recipe"

### **2. Preview Content**
- Click "Preview" button
- Switch between "Extracted Data" and "Raw Content" tabs
- View actual document content in "Raw Content" tab

### **3. Verify and Edit**
- Compare extracted data with original content
- Make corrections as needed
- Use "Get Nutrition" buttons for missing data

## 🔮 **Future Enhancements**

### **Potential Improvements**
- **Syntax Highlighting**: Color-code different content types
- **Search Functionality**: Search within document content
- **Export Options**: Export raw content to text file
- **Side-by-Side View**: Show original and extracted data side by side
- **Content Validation**: Highlight potential extraction issues

### **Advanced Features**
- **Image Extraction**: Extract and display images from documents
- **Formatting Preservation**: Maintain original formatting
- **Version Comparison**: Compare different document versions
- **Content Analysis**: AI-powered content analysis and suggestions

## 🎉 **Ready to Use**

The enhanced document preview now provides:

✅ **Real Content Viewing**: Actual .docx file content  
✅ **Dual View Mode**: Extracted data + Raw content  
✅ **Better Formatting**: Clean, readable display  
✅ **Error Handling**: Graceful fallbacks  
✅ **Scrollable Content**: Handles long documents  

Users can now see exactly what content was extracted from their uploaded documents, making it much easier to verify the accuracy of the recipe extraction process! 