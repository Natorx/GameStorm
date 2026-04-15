// 格式化日期的函数  
export function formatDate(date: Date): string {  
    const month = String(date.getMonth() + 1).padStart(2, '0'); // 月份从0开始，所以要+1，并使用padStart确保两位数字  
    const day = String(date.getDate()).padStart(2, '0'); // 使用padStart确保两位数字  
    return `${month}-${day}`;  
  }  