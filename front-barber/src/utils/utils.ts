export const formatPhoneNumberInput = (value: string) => {
    // Remover caracteres não numéricos
    const numericValue = value.replace(/\D/g, "");
  
    // Limitar a 11 números
    const truncatedValue = numericValue.slice(0, 11);
  
    // Aplicar a máscara de telefone enquanto digita
    let formattedValue = truncatedValue;
  
    if (truncatedValue.length > 2) {
      formattedValue = `(${truncatedValue.slice(0, 2)}`;
  
      if (truncatedValue.length > 2) {
        formattedValue += `) ${truncatedValue.slice(2, 7)}`;
      }
  
      if (truncatedValue.length > 7) {
        formattedValue += `-${truncatedValue.slice(7)}`;
      }
    }
  
    return formattedValue;
  };