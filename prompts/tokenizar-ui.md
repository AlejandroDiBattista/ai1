Necesito migrar todo el proyecto a un sistema de tokens CSS centralizado y consistente:

1. **ANÁLISIS INICIAL:**
   - Audita todos los archivos *.module.css para identificar valores hardcodeados
   - Identifica patrones comunes (colores, espaciado, tipografía, radios, sombras)

2. **CREACIÓN DEL SISTEMA:**
   - Crea un archivo variables.css con tokens CSS basado en tokens.ts existente
   - Asegúrate de que se importe automáticamente en index.css
   - Incluye: colores, tipografía, espaciado (grid 4px), radios, sombras

3. **MIGRACIÓN AUTOMÁTICA:**
   - Crea scripts para reemplazar valores hardcodeados por variables CSS
   - Convierte #1476FF → var(--color-primary), 24px → var(--spacing-6), etc.
   - NO toques valores específicos como alturas de inputs (44px) o breakpoints (768px)

4. **VALIDACIÓN:**
   - Crea script de validación que ignore valores que DEBEN ser hardcodeados
   - Genera reporte de progreso con estadísticas de uso

5. **DOCUMENTACIÓN:**
   - Actualiza .github/copilot-instructions.md con las nuevas reglas
   - Crea guía CSS_TOKENS_GUIDE.md con ejemplos y tabla de conversión