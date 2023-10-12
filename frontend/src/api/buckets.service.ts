class _BucketService {
    getAlbumCoverUrl(albumCoverId: string) {
        return "http://localhost:9000/album-covers/" + albumCoverId;
    }
}

export const BucketService = new _BucketService();