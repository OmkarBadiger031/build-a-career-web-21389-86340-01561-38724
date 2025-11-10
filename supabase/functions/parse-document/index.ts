import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { fileData, fileName, mimeType } = await req.json();
    
    console.log(`Processing file: ${fileName}, type: ${mimeType}`);
    
    // Decode base64 to binary
    const binaryString = atob(fileData);
    const bytes = new Uint8Array(binaryString.length);
    for (let i = 0; i < binaryString.length; i++) {
      bytes[i] = binaryString.charCodeAt(i);
    }
    
    let extractedText = '';
    
    // Handle different file types
    if (mimeType.includes('pdf') || fileName.toLowerCase().endsWith('.pdf')) {
      // For PDF files, extract text using simple heuristics
      // Note: This is a basic implementation. For production, consider using a proper PDF parser
      const text = new TextDecoder().decode(bytes);
      
      // Try to extract text between common PDF text markers
      const textMatches = text.match(/\((.*?)\)/g);
      if (textMatches) {
        extractedText = textMatches
          .map(match => match.slice(1, -1))
          .join(' ')
          .replace(/\\[rn]/g, ' ')
          .replace(/\s+/g, ' ')
          .trim();
      }
      
      // If no text found with markers, try to extract readable characters
      if (!extractedText || extractedText.length < 50) {
        extractedText = text
          .replace(/[^\x20-\x7E\n\r]/g, ' ')
          .replace(/\s+/g, ' ')
          .trim();
      }
      
    } else if (mimeType.includes('word') || mimeType.includes('document') || 
               fileName.toLowerCase().endsWith('.doc') || fileName.toLowerCase().endsWith('.docx')) {
      // For Word documents, try to extract readable text
      const text = new TextDecoder().decode(bytes);
      
      // Extract readable ASCII characters
      extractedText = text
        .replace(/[^\x20-\x7E\n\r]/g, ' ')
        .replace(/\s+/g, ' ')
        .trim();
        
    } else if (mimeType.includes('presentation') || mimeType.includes('powerpoint') ||
               fileName.toLowerCase().endsWith('.ppt') || fileName.toLowerCase().endsWith('.pptx')) {
      // For PowerPoint, extract readable text
      const text = new TextDecoder().decode(bytes);
      
      extractedText = text
        .replace(/[^\x20-\x7E\n\r]/g, ' ')
        .replace(/\s+/g, ' ')
        .trim();
        
    } else if (mimeType.includes('image') || 
               fileName.toLowerCase().match(/\.(jpg|jpeg|png|gif|bmp)$/)) {
      return new Response(
        JSON.stringify({ 
          error: 'Image files require OCR processing. Please convert your resume to PDF, DOCX, or plain text format for better results.'
        }),
        { 
          status: 400,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      );
    } else {
      // Try to decode as text for unknown types
      try {
        extractedText = new TextDecoder().decode(bytes);
      } catch (e) {
        return new Response(
          JSON.stringify({ 
            error: 'Unsupported file format. Please use PDF, DOCX, TXT, or JSON format.'
          }),
          { 
            status: 400,
            headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
          }
        );
      }
    }
    
    // Validate extracted text
    if (!extractedText || extractedText.length < 20) {
      console.log('Extraction result too short:', extractedText.length, 'chars');
      return new Response(
        JSON.stringify({ 
          error: 'Could not extract readable text from this file. Please try:\n1. Converting to plain text (.txt)\n2. Using a different file format\n3. Ensuring the file is not password-protected or encrypted'
        }),
        { 
          status: 400,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      );
    }
    
    console.log(`Successfully extracted ${extractedText.length} characters`);
    
    return new Response(
      JSON.stringify({ text: extractedText }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
    
  } catch (error) {
    console.error('Document parsing error:', error);
    return new Response(
      JSON.stringify({ 
        error: error instanceof Error ? error.message : 'Failed to parse document'
      }),
      { 
        status: 500, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    );
  }
});
