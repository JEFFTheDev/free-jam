class _BucketService {
    getAlbumCoverUrl(albumCoverId: string) {
        return "http://localhost/bucket/album-covers/" + albumCoverId;
    }
}

export const BucketService = new _BucketService();