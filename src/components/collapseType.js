export default function collapseType (name) {
    switch (name) {
    case '自由時報':
      return document.cookie.split(';').map(i => i.trim() ).find((row) => row.startsWith('ltn='))?.split('=')[1];
      case '中央社':
      return document.cookie.split(';').map(i => i.trim() ).find((row) => row.startsWith('cna='))?.split('=')[1];
      case '華視':
      return document.cookie.split(';').map(i => i.trim() ).find((row) => row.startsWith('cts='))?.split('=')[1];
      case '關鍵字分析':
        return document.cookie.split(';').map(i => i.trim() ).find((row) => row.startsWith('keywords='))?.split('=')[1];
      case 'ltn':
        return document.cookie.split(';').map(i => i.trim() ).find((row) => row.startsWith('ltn='))?.split('=')[1];
        case 'cna':
        return document.cookie.split(';').map(i => i.trim() ).find((row) => row.startsWith('cna='))?.split('=')[1];
        case 'cts':
        return document.cookie.split(';').map(i => i.trim() ).find((row) => row.startsWith('cts='))?.split('=')[1];
        case 'keywords':
          return document.cookie.split(';').map(i => i.trim() ).find((row) => row.startsWith('keywords='))?.split('=')[1];
    default:
      break;
  } 
}