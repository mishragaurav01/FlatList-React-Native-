// WindowedFlatListExample.js
import React, { useCallback, useEffect, useRef, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  Button,
  StyleSheet,
} from 'react-native';

const TOTAL_COUNT = 1000000; // pretend huge dataset
const PAGE_SIZE = 20;
const ITEM_HEIGHT = 70;

export default function WindowedFlatListExample() {
  const [pages, setPages] = useState({}); // { [pageIndex]: [items...] }
  const loadingPagesRef = useRef(new Set()); // track pages being fetched
  const nextSequentialPageRef = useRef(0); // used by onEndReached sequential load

  // Simulated API: fetch pageNumber, returns array of items
  const fakeFetchPage = (pageNumber) =>
    new Promise((resolve) => {
      setTimeout(() => {
        const base = pageNumber * PAGE_SIZE;
        const items = Array.from({ length: PAGE_SIZE }, (_, i) => {
          const index = base + i;
          return { id: String(index), title: `Item ${index}`, index };
        });
        resolve(items);
      }, 700); // simulate network
    });

  const loadPage = useCallback(async (pageNumber) => {
    if (pageNumber < 0) return;
    const totalPages = Math.ceil(TOTAL_COUNT / PAGE_SIZE);
    if (pageNumber >= totalPages) return;
    if (pages[pageNumber] || loadingPagesRef.current.has(pageNumber)) return;

    loadingPagesRef.current.add(pageNumber);
    try {
      const items = await fakeFetchPage(pageNumber);
      setPages((prev) => ({ ...prev, [pageNumber]: items }));
    } finally {
      loadingPagesRef.current.delete(pageNumber);
    }
  }, [pages]);

  // Preload first page on mount
  useEffect(() => {
    loadPage(0);
    nextSequentialPageRef.current = 1;
  }, [loadPage]);

  // getItem and getItemCount for VirtualizedList
  const getItem = useCallback((data, index) => {
    const pageIndex = Math.floor(index / PAGE_SIZE);
    const itemIndex = index % PAGE_SIZE;
    const page = data.pages?.[pageIndex];
    if (page && page[itemIndex]) return page[itemIndex];
    // Return a placeholder object (safe to render)
    return { id: String(index), loading: true, index };
  }, []);

  const getItemCount = useCallback((data) => {
    return data.totalCount;
  }, []);

  const renderItem = useCallback(({ item }) => {
    if (item.loading) {
      return (
        <View style={[styles.item, styles.placeholder]}>
          <Text>Loading…</Text>
        </View>
      );
    }
    return (
      <View style={styles.item}>
        <Text style={styles.title}>{item.title}</Text>
      </View>
    );
  }, []);

  const keyExtractor = useCallback((item, index) => item?.id ?? String(index), []);

  // Called when list approaches the end: we sequentially load next pages
  const onEndReached = useCallback(() => {
    const pageToLoad = nextSequentialPageRef.current;
    nextSequentialPageRef.current += 1;
    loadPage(pageToLoad);
  }, [loadPage]);

  // Provide data wrapper expected by getItem/getItemCount
  const dataWrapper = { pages, totalCount: TOTAL_COUNT };

  return (
    <View style={{ flex: 1, paddingTop: 40 }}>
      <View style={styles.toolbar}>
        <Button title="Load page 10" onPress={() => loadPage(10)} />
        <Button title="Load page 100" onPress={() => loadPage(100)} />
      </View>

      <FlatList
        data={dataWrapper}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        getItem={getItem}
        getItemCount={getItemCount}
        onEndReached={onEndReached}
        onEndReachedThreshold={0.5}
        initialNumToRender={8}
        windowSize={5}
        // fast scrollToIndex because fixed item size:
        getItemLayout={(_, index) => ({
          length: ITEM_HEIGHT,
          offset: ITEM_HEIGHT * index,
          index,
        })}
        // show a footer indicator when the next sequential page is loading
        ListFooterComponent={() =>
          loadingPagesRef.current.size > 0 ? (
            <View style={{ padding: 16 }}>
              <ActivityIndicator />
            </View>
          ) : null
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  toolbar: { flexDirection: 'row', justifyContent: 'space-around', marginBottom: 8 },
  item: {
    height: ITEM_HEIGHT,
    justifyContent: 'center',
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderColor: '#eee',
  },
  placeholder: { backgroundColor: '#fafafa' },
  title: { fontSize: 16 },
});
