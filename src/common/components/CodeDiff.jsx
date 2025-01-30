import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { Box, Flex } from '@chakra-ui/react';
import PropTypes from 'prop-types';

export default function CodeDiff({ oldCode, newCode, language, oldColor, newColor }) {
  return (
    <Flex gap="20px">
      {/* Código Original */}
      <Box flex="1" border="1px solid #ddd" borderRadius="8px" overflow="hidden">
        <Box backgroundColor={oldColor || '#f4f4f4'} padding="10px" fontWeight="bold">
          Código Anterior
        </Box>
        <SyntaxHighlighter language={language}>
          {oldCode.trim()}
        </SyntaxHighlighter>
      </Box>

      {/* Código Modificado */}
      <Box flex="1" border="1px solid #ddd" borderRadius="8px" overflow="hidden">
        <Box backgroundColor={newColor || '#004207'} color="white" padding="10px" fontWeight="bold">
          Código Modificado
        </Box>
        <SyntaxHighlighter language={language}>
          {newCode.trim()}
        </SyntaxHighlighter>
      </Box>
    </Flex>
  );
}

// Validaciones de PropTypes
CodeDiff.propTypes = {
  oldCode: PropTypes.string.isRequired,
  newCode: PropTypes.string.isRequired,
  language: PropTypes.string.isRequired,
  oldColor: PropTypes.string,
  newColor: PropTypes.string,
};

// Valores por defecto
CodeDiff.defaultProps = {
  oldColor: '#f4f4f4',
  newColor: '#004207',
};
