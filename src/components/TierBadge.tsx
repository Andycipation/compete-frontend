import React from "react";

const tierBadgeUrl = (tier: string | number): string => {
  return `https://d2gd6pc034wcta.cloudfront.net/tier/${tier}.svg`;
};

interface Props {
  tier: number;
  className?: string;
}

const TierBadge: React.FC<Props> = ({ tier, ...rest }: Props) => {
  // rest: e.g. className to control margins
  return <img src={tierBadgeUrl(tier)} alt={`tier${tier}`} {...rest} />;
};

export default TierBadge;
