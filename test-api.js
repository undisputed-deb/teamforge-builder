// Save this as test-api.js in your project root and run: node test-api.js

const supabaseUrl = 'https://rrbptzorqyxplylhqkfa.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJyYnB0em9ycXl4cGx5bGhxa2ZhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTM3Njg0MzMsImV4cCI6MjA2OTM0NDQzM30.A5oOu50ESTPk3InpnC7WacbJvzGMQOXlZNECwODu7j0';

async function testAPI() {
  console.log('Testing Supabase API...');
  
  try {
    // Test 1: Check if the project exists
    const response = await fetch(`${supabaseUrl}/rest/v1/`, {
      headers: {
        'apikey': supabaseKey,
        'Authorization': `Bearer ${supabaseKey}`
      }
    });
    
    console.log('Project status:', response.status);
    
    if (response.status === 404) {
      console.log('❌ Project not found (404) - You need a new Supabase project');
      return;
    }
    
    // Test 2: Check if crewmates table exists
    const tableResponse = await fetch(`${supabaseUrl}/rest/v1/crewmates?select=count`, {
      headers: {
        'apikey': supabaseKey,
        'Authorization': `Bearer ${supabaseKey}`
      }
    });
    
    console.log('Table status:', tableResponse.status);
    
    if (tableResponse.status === 404) {
      console.log('❌ Table "crewmates" not found - You need to create the table');
      return;
    }
    
    if (tableResponse.status === 401) {
      console.log('❌ Unauthorized - RLS might be enabled');
      return;
    }
    
    const tableData = await tableResponse.json();
    console.log('✅ API is working! Table response:', tableData);
    
    // Test 3: Try to create a test record
    const createResponse = await fetch(`${supabaseUrl}/rest/v1/crewmates`, {
      method: 'POST',
      headers: {
        'apikey': supabaseKey,
        'Authorization': `Bearer ${supabaseKey}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: 'Test Crewmate',
        speed: 3,
        color: 'blue',
        category: 'Crewmate'
      })
    });
    
    console.log('Create test status:', createResponse.status);
    
    if (createResponse.status === 201) {
      console.log('✅ Create operation works!');
    } else {
      const error = await createResponse.text();
      console.log('❌ Create failed:', error);
    }
    
  } catch (error) {
    console.log('❌ API test failed:', error.message);
  }
}

testAPI();