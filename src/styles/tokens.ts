// Design tokens extraídos del estilo.json
export const tokens = {
  color: {
    primary: '#1476FF',
    primaryHover: '#0F64DB',
    error: '#FF3B30',
    warning: '#FF9500',
    success: '#34C759',
    info: '#5AC8FA',
    
    textHigh: '#0A0A0A',
    textMedium: '#545454',
    textLow: '#8E8E93',
    
    surface01: '#FFFFFF',
    surface02: '#F6F7F9',
    stroke: '#E5E5EA',
    overlay: 'rgba(0,0,0,0.25)'
  },
  
  typography: {
    fontFamily: 'system-ui, -apple-system, sans-serif',
    h1: { size: '24px', weight: 700, lineHeight: '32px' },
    h2: { size: '20px', weight: 600, lineHeight: '28px' },
    h3: { size: '17px', weight: 600, lineHeight: '24px' },
    body: { size: '15px', weight: 400, lineHeight: '22px' },
    caption: { size: '13px', weight: 400, lineHeight: '18px' }
  },
  
  spacing: {
    0: '0px',
    1: '4px',
    2: '8px',
    3: '12px',
    4: '16px',
    5: '20px',
    6: '24px'
  },
  
  radius: {
    sm: '6px',
    md: '12px',
    lg: '20px',
    pill: '999px'
  },
  
  shadow: {
    card: '0px 2px 6px rgba(0,0,0,0.06)',
    elevated: '0px 4px 12px rgba(0,0,0,0.08)'
  }
};
