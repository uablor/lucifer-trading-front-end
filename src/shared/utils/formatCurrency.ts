export const formatCurrency = (value: number, currency: string = 'LAK') => {
  return new Intl.NumberFormat('lo-LA', {
    style: 'currency',
    currency: currency,
  }).format(value);
};


export const formatPrice = (value:any) => {
    if (!value) return ''; // ถ้าไม่มีค่า return ค่าเป็น string ว่าง
    return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","); // คั่นหลักพันด้วยคอมมา
  }