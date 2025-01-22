import * as XLSX from 'xlsx'

interface Employee {
  id: string;
  profile: string;
  email: string;
  role: string;
  status: string;
}

const formatHeaders = (headers: string[]) => {
  return headers.map((header) => {
    let newHeader = header.toLowerCase()
    if(newHeader.includes("id")) {
      newHeader = "id"
      return newHeader
    }
    if(newHeader.includes("name") || newHeader.includes("first") || newHeader.includes("last") || newHeader.includes("profile")) {
      newHeader = "profile"
      return newHeader
    } 
    if(newHeader.includes("email")) {
      newHeader = "email"
      return newHeader
    }
    if(newHeader.includes("role")) {
      newHeader = "role"
      return newHeader
    }
    if(newHeader.includes("status")) {
      newHeader = "status"
      return newHeader
    }
    return newHeader
  });
}

export const parseFile = (file: File): Promise<Employee[]> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    
    reader.onload = (e) => {
      try {
        const data = e.target?.result
        const workbook = XLSX.read(data, { type: 'array' })
        const sheetName = workbook.SheetNames[0]
        const worksheet = workbook.Sheets[sheetName]
        const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 })
        
        const [headers, ...rows] = jsonData as string[][]

        const formattedHeaders = formatHeaders(headers)

        const formattedData = rows.map((row) => {
          const obj = {
            id: '',
            profile: '',
            email: '',
            role: '',
            status: ''
          } as Employee;
          formattedHeaders.forEach((header, index) => {
            if (header in obj) {
              obj[header as keyof Employee] = row[index] || '';
            }
          });
          return obj;
        })
        
        console.log('Parsed data:', formattedData)
        resolve(formattedData as Employee[])
      } catch (error) {
        console.error('Error parsing file:', error)
        reject(error)
      }
    }
    
    reader.onerror = (error) => {
      console.error('FileReader error:', error)
      reject(error)
    }
    reader.readAsArrayBuffer(file)
  })
}

