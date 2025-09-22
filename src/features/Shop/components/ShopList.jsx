import React, { useEffect, useState } from "react";
import styled from "styled-components";
import axios from "axios";
import ShopListItem from "./ShopListItem";
import { coupons } from "../../../mocks/coupons";

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

const ShopList = ({ userId }) => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        if (!BASE_URL) {
          console.warn("⚠️ BASE_URL이 설정되지 않았습니다. → 목데이터 사용");
          setItems(coupons);
          return;
        }

        const res = await axios.get(`${BASE_URL}/api/coupons`);
        setItems(res.data);
      } catch (err) {
        console.error("API 호출 실패:", err);
        setItems(coupons);
      } finally {
        setLoading(false);
      }
    };

    fetchItems();
  }, []);

  if (loading) return <div></div>;
  if (!items.length) return <div>쿠폰이 없습니다.</div>;

  return (
    <Container>
      {items.map((item) => (
        <ShopListItem key={item.couponId} item={item} userId={userId} />
      ))}
    </Container>
  );
};

export default ShopList;

const Container = styled.div`
  background-color: transparent;
  width: 100%;
`;
