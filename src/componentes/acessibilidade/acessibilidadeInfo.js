import React, {useEffect, useRef} from 'react';
import {
  Text,
  findNodeHandle,
  AccessibilityInfo,
  StyleSheet,
} from 'react-native';

export default function AcessibilidadeFoco({mensagem}) {
  const ref = useRef(null);

  useEffect(() => {
    const tag = findNodeHandle(ref.current);
    if (tag) {
      // Delay para garantir que o componente está montado
      setTimeout(() => {
        AccessibilityInfo.setAccessibilityFocus(tag);
      }, 500);
    }
  }, [mensagem]);

  return (
    <Text
      ref={ref}
      accessible={true}
      accessibilityRole="header"
      style={styles.invisivel}>
      {mensagem}
    </Text>
  );
}

const styles = StyleSheet.create({
  invisivel: {
    position: 'absolute',
    height: 0,
    width: 0,
    opacity: 0,
  },
});
